import type {Metadata} from 'next'
import localFont from 'next/font/local'
import './globals.css'

const SuisseIntl = localFont({
  src: [
    {
      path: '../assets/fonts/SuisseIntl-Light.woff2',
      weight: '300',
    },
    {
      path: '../assets/fonts/SuisseIntl-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/SuisseIntl-Book.woff2',
      weight: '450',
    },
    {
      path: '../assets/fonts/SuisseIntl-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/SuisseIntl-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../assets/fonts/SuisseIntl-Bold.woff2',
      weight: '700',
    },
  ],
})

import Header from '#/Global/Header'
import Footer from '#/Global/Footer'

export const metadata: Metadata = {
  title: 'Санаторий Удельная',
  description: 'Санаторий «Удельная» является старейшей здравницей Центросоюза России, начав функционировать в 1936 году как дом отдыха для сотрудников потребкооперации на 120 койко-мест. Ознакомьтесь с нашими вариантами размещения!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`relative text-custom-gray ${SuisseIntl.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
