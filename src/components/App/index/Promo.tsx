import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import dynamic from 'next/dynamic'

const PromoSlider = dynamic(
  () => {
    return import('##/index/PromoSlider')
  },
  {ssr: false},
)

interface Promo {
  title: string
  caption: string
  id: number
  description?: any
  image: Array<{asset: {url: string}}>
  mobile_image: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(): Promise<Promo[]> {
  const data = await client.fetch<Promo>(
    `*[_type == 'promo'] {
      title,
      caption,
      id,
      description,
      image,
      mobile_image,
      slug,
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

  const sliderData = promo.map((promo) => ({
    title: promo.title,
    caption: promo.caption,
    id: promo.id,
    description: promo.description,
    imageUrl: urlForImage(promo.image).url(),
    mobileImageUrl: urlForImage(promo.mobile_image).url(),
    slug: promo.slug,
  }))

  const mobileScreenHeight = 'sm:!h-[100svh] sm:h-[100vh]'

  return <PromoSlider sliderData={sliderData} className={`mt-[12.5vh] xl:mt-[15vh] sm:mt-0 w-full h-[70vh] ${mobileScreenHeight}`} />
}

export default Promo
