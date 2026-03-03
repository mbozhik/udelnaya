export {metadata} from '@/lib/layout-config'
import {suisseIntl} from '@/lib/layout-config'
import './globals.css'

import Header from '#/Global/Header'
import Footer from '#/Global/Footer'
import Notification from '#/Global/Notification'
import YandexMetrika from '#/Global/YandexMetrika'
// import LiveChat from '#/Global/LiveChat'
import LeadBack from '#/Global/LeadBack'

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

      <body className={`relative h-full text-custom-gray ${suisseIntl.className}`}>
        <div className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>

        <Notification />
      </body>

      <YandexMetrika />
      {/* <LiveChat /> */}
      <LeadBack />
    </html>
  )
}
