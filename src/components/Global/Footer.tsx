import {client, urlForFile} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import {Fragment} from 'react'

import Container from '#/Global/Container'
import Link from 'next/link'
import Button from '#/UI/Button'
import Error from '#/UI/Error'

interface Footer {
  prices: {asset: {_ref: string}}
  credentials: {asset: {_ref: string}}
  legislation: {asset: {_ref: string}}
  privacy_policy: {asset: {_ref: string}}
  requisites: {asset: {_ref: string}}
}

async function getData(): Promise<Footer[]> {
  const data = await client.fetch<Footer>(
    `*[_type == 'footer'] {
        prices,
        credentials,
        legislation,
        privacy_policy,
        requisites,
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return Array.isArray(data) ? data : []
}

const Footer = async () => {
  const footer: Footer[] = await getData()

  if (!footer) {
    return <Error />
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-custom-light-gray pt-10 sm:pt-5 pb-5 mt-20">
      <Container padding={false}>
        <div className="space-y-5 xl:space-y-5 sm:space-y-5">
          <div className="gap-3 flex w-full sm:flex-col">
            <Button type="link" blank={true} href={urlForFile(footer[0].prices.asset._ref)} size="lg" className="uppercase w-full" adavanced_hover={true} text={`Цены на услуги ${currentYear}`} />
            <Button type="link" href="/sanatorium/info" size="lg" className="uppercase w-full" adavanced_hover={true} text="Важная информация" />
          </div>

          <div className="space-y-2 sm:space-y-5">
            <div className="flex sm:flex-col justify-between sm:gap-2">
              {footer.map((footerItem, idx) =>
                Object.entries(footerItem)
                  .filter(([key]) => key !== 'prices')
                  .map(([key, value]) => {
                    const footerLinks = {credentials: 'Свидетельства, лицензии, сертификаты', legislation: 'Медицинское законодательство', requisites: 'Реквизиты', privacy_policy: 'Политика конфиденциальности'}
                    return (
                      <Link href={urlForFile(value.asset._ref)} target="_blank" className="xl:text-xs sm:text-sm text-custom-primary hover:text-custom-gray duration-200" key={idx + key}>
                        {footerLinks[key] || key}
                      </Link>
                    )
                  }),
              )}
            </div>

            <div className="xl:text-sm sm:text-sm flex sm:flex-col sm:gap-2 sm:text-left justify-between text-center">
              <span>ООО «Санаторий Удельная»</span>
              <span>© 2024 | sanatoriyudelnaya.ru</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
