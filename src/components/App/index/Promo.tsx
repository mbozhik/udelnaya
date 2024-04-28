import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import dynamic from 'next/dynamic'

const PromoSlider = dynamic(
  () => {
    return import('##/index/PromoSlider')
  },
  {ssr: false},
)

export interface Promo {
  title: string
  caption: string
  image: Array<{asset: {url: string}}>
  mobile_image: Array<{asset: {url: string}}>
}

async function getData(): Promise<Promo[]> {
  const data = await client.fetch<Promo>(
    `*[_type == 'promo'] {
      title,
      caption,
      image,
      mobile_image,
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

const Promo = async () => {
  const promo: Promo[] = await getData()

  if (!promo) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliderData = promo.map((promotion) => ({
    imageUrl: urlForImage(promotion.image).url(),
    mobileImageUrl: urlForImage(promotion.mobile_image).url(),
    title: promotion.title,
    caption: promotion.caption,
  }))

  return <PromoSlider sliderData={sliderData} className="mt-[12.5vh] xl:mt-[15vh] sm:mt-0 w-full h-[70vh] sm:!h-[100svh] sm:h-[100vh]" />
}

export default Promo
