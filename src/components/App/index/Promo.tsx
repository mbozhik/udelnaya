import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import PromoSlider from '@/components/App/index/PromoSlider'

const getData = async () => {
  noStore()

  const query = `
    *[_type == 'promo'] {
      title,
      caption,
      image
    }`

  const data = await client.fetch(query)
  return data
}

const Promo = async ({classes}) => {
  const promo = await getData()

  if (!promo) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliderData = promo.map((promotion) => ({
    imageUrl: urlForImage(promotion.image.asset._ref).url(),
    title: promotion.title,
    caption: promotion.caption,
  }))

  return <PromoSlider sliderData={sliderData} classes={classes} />
}

export default Promo
