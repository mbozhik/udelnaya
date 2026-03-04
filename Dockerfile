# Multi-stage build для минимизации памяти и размера образа
# Используем Node.js 22-alpine (исправлены уязвимости из node:20-alpine)
FROM node:22-alpine AS base

# Включаем pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage: Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml* ./

# Разрешаем build scripts (для sharp, esbuild)
ENV PNPM_IGNORE_PACKAGE_MANAGER_VERSION=true
RUN pnpm config set ignore-build-scripts false

# Устанавливаем ВСЕ зависимости (включая devDependencies для сборки)
# НЕ используем --prod, т.к. Next.js требует autoprefixer, tailwindcss и др.
RUN pnpm install --frozen-lockfile

# Запускаем build scripts для нативных модулей (sharp, esbuild)
RUN pnpm rebuild

# Stage: Сборка
FROM base AS builder
WORKDIR /app

# Копируем зависимости
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию и ограничиваем память для сборки
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Собираем проект
RUN pnpm build

# Stage: Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Создаем директорию .next (public может не существовать)
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# Копируем standalone сборку
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))" || exit 1

CMD ["node", "server.js"]
