import React from 'react'

export default function Error() {
  return (
    <section className="w-full overflow-hidden h-screen grid place-items-center">
      <mark className="px-4 py-2 rounded-md animate-pulse">Произошла ошибка при получении данных!</mark>
    </section>
  )
}
