import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import MedicineSlider from '#/App/index/MedicineSlider'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

interface Medicine {
  name: string
  description: string
  image: {asset: {url: string}}
  price: number
  // slug: {current: string}
}

const getData = async (): Promise<Medicine[]> => {
  noStore()

  const query = `
    *[_type == 'medicine'] {
        name,
        description,
        image,
        price,
        slug
    }`

  const data: Medicine[] = await client.fetch(query)
  return data
}

const Medicine = async ({classes}) => {
  const medicine: Medicine[] = await getData()

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliderData = medicine.map((procedure) => ({
    name: procedure.name,
    description: procedure.description,
    imageUrl: urlForImage(procedure.image).url(),
    price: procedure.price,
    // slug: procedure.slug.current,
  }))
  console.log('🚀 ~ sliderData ~ sliderData:', sliderData)

  return (
    <section data-section="medicine-index" className="mt-20 space-y-10">
      <Heading type="title" classes="text-center" text="Медицина" />

      <MedicineSlider sliderData={sliderData} classes={classes} />

      <Button type="link" href="/medicine" size="lg" variant="secondary" adavanced_hover={true} classes="w-full" text="Процедуры" />
    </section>
  )
}

export default Medicine
