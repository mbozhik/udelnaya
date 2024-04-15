import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import Heading from '#/UI/Heading'
import MedicineSlider from '##/index/MedicineSlider'

interface Medicine {
  name: string
  description: string
  image: {asset: {url: string}}
  special_offer: boolean
  slug: {current: string}
}

const getData = async (): Promise<Medicine[]> => {
  noStore()

  const query = `
    *[_type == 'medicine'] {
        name,
        description,
        image,
        special_offer,
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

  const sliderData = medicine.map((section) => ({
    name: section.name,
    description: section.description,
    imageUrl: urlForImage(section.image).url(),
    special_offer: section.special_offer,
    slug: section.slug.current,
  }))

  return (
    <section data-section="medicine-index" className="mt-20 space-y-10">
      <Heading type="title" classes="text-center" text="Медицина" />

      <MedicineSlider sliderData={sliderData} classes={classes} />
    </section>
  )
}

export default Medicine