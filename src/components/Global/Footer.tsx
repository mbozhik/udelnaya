import {client, urlForFile} from '@/lib/sanity'
import {cn, revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import Container from '#/Global/Container'
import Button from '#/UI/Button'
import Error from '#/UI/Error'

import {buttonVariants} from '#/UI/Button'
const buttonStyles = [buttonVariants.default.styles, buttonVariants.primary.default, buttonVariants.primary.hover]

import VkImage from '../../assets/images/socials/vk.svg'
import TgImage from '../../assets/images/socials/tg.svg'
import OkImage from '../../assets/images/socials/ok.svg'

interface Footer {
  prices: {asset: {_ref: string}}
  credentials: {asset: {_ref: string}}
  legislation: {asset: {_ref: string}}
  privacy_policy: {asset: {_ref: string}}
  requisites: {asset: {_ref: string}}
}

async function getData(): Promise<{footer: Footer[]; contacts: any}> {
  const [footer, contacts] = await Promise.all([
    client.fetch<Footer[]>(
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
    ),
    client.fetch(
      `*[_type == 'contacts'][0] {
        socials,
      }`,
      {},
      {
        next: {
          revalidate: revalidateOnTime,
        },
      },
    ),
  ])

  return {
    footer: Array.isArray(footer) ? footer : [],
    contacts,
  }
}

const Footer = async () => {
  const {footer, contacts} = await getData()

  const socialsLinks = contacts.socials.flatMap(({children}) => children.filter(({_type, text}) => _type === 'span' && text.startsWith('http'))).map(({text}) => text)

  const socialsData = {
    vk: {
      url: socialsLinks.find((link) => link.includes('vk.com')),
      icon: VkImage,
    },
    tg: {
      url: socialsLinks.find((link) => link.includes('t.me')),
      icon: TgImage,
    },
    ok: {
      url: socialsLinks.find((link) => link.includes('ok.ru')),
      icon: OkImage,
    },
  }

  if (!footer) {
    return <Error />
  }

  const currentYear = new Date().getFullYear()

  const footerDocLinks = {
    credentials: 'Свидетельства, лицензии, сертификаты',
    legislation: 'Медицинское законодательство',
    requisites: 'Реквизиты',
    privacy_policy: 'Политика конфиденциальности',
  }

  const getCustomAttributes = (key: string, value: any) => {
    const href = key === 'legislation' ? '/sanatorium/legislation/' : urlForFile(value.asset._ref)
    const target = key === 'legislation' ? '_self' : '_blank'
    return {href, target}
  }

  return (
    <footer className="pt-10 pb-5 mt-20 bg-custom-light-gray sm:pt-5">
      <Container padding={false}>
        <div className="space-y-5 xl:space-y-5 sm:space-y-5">
          <div className="flex w-full gap-3 sm:flex-col">
            <Button type="link" blank={true} href={urlForFile(footer[0].prices.asset._ref)} size="lg" className="w-full uppercase" adavanced_hover={true} text={`Цены на услуги ${currentYear}`} />
            <Button type="link" href="/sanatorium/info" size="lg" className="w-full uppercase" adavanced_hover={true} text="Важная информация" />

            <div className="flex gap-3 sm:mx-auto sm:mt-2 sm:mb-1">
              {Object.entries(socialsData).map(([key, social]) => (
                <Link href={social.url} className={cn(buttonStyles, 'block !p-0 w-11 h-11 aspect-square')} key={key} target="_blank" rel="noopener noreferrer">
                  <Image className="object-cover s-full" src={social.icon} alt="" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-5">
            <div className="flex justify-between sm:flex-col sm:gap-2">
              {Object.entries(footerDocLinks).map(([key, label], idx) => {
                const value = footer[0][key]
                const {href, target} = getCustomAttributes(key, value)

                return (
                  <Link href={href} target={target} className="duration-200 xl:text-xs sm:text-sm text-custom-primary hover:text-custom-gray" key={idx + key}>
                    {label}
                  </Link>
                )
              })}
            </div>

            <div className="flex justify-between text-center xl:text-sm sm:text-sm sm:flex-col sm:gap-2 sm:text-left">
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
