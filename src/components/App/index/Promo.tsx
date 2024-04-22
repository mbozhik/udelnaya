import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import PromoSlider from '##/index/PromoSlider'

interface Promo {
  title: string
  caption: string
  image: Array<{asset: {url: string}}>
}

async function getData(): Promise<Promo[]> {
  const data = await client.fetch<Promo>(
    `*[_type == 'promo'] {
      title,
      caption,
      image
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
    title: promotion.title,
    caption: promotion.caption,
  }))

  return <PromoSlider sliderData={sliderData} classes="w-full h-[65vh] sm:!h-[100svh] sm:h-[100vh]" />
}

export default Promo
