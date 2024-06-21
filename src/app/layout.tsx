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
import YandexMetrika from '#/Global/YandexMetrika'
import LiveChat from '#/Global/LiveChat'

export const metadata: Metadata = {
  title: 'Санаторий «Удельная» – оздоровление и реабилитация в Подмосковье',
  description: 'Медицинский центр, недорогой санаторий с лечением и отдыхом в Подмосковье. Детокс, кардиореабилитация, программы для похудения, укрепления иммунитета',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth h-full">
      <head>
        <meta name="yandex-verification" content="113e7d3e6c327c5b" />
      </head>
      <body className={`relative h-full text-custom-gray ${SuisseIntl.className}`}>
        <div className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>

      <YandexMetrika />
      <LiveChat />
    </html>
  )
}
