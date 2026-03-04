/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Отключаем статическую генерацию для экономии памяти
  // distDir: '.next',
  // Оптимизации для сборки
  swcMinify: true,
  // Отключаем экспериментальные фичи
  experimental: {
    // Оптимизация для памяти
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    // Отключаем sharp при сборке, используем только в runtime
    // unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
    ],
    // Уменьшаем размеры для экономии памяти
    // deviceSizes: [640, 750, 828, 1080, 1200],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Компрессия для уменьшения нагрузки
  compress: true,
  // Отключаем source maps в production
  productionBrowserSourceMaps: false,
  // Ограничиваем количество параллельных билдов
  staticPageGenerationTimeout: 60,
}

export default nextConfig
