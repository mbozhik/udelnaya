import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import ImageSlider from '#/UI/ImageSlider'
import Button from '#/UI/Button'
import Questions from '##/index/Questions'

interface MedicinePage {
  name: string
  short_description: any
  description: any
  image: Array<{asset: {url: string}}>
  special_offer: boolean
  slug: {current: string}
}

async function getData(slug): Promise<MedicinePage | null> {
  const data = await client.fetch<MedicinePage>(
    `*[_type == 'medicine' && slug.current == '${slug}'][0] {
        name,
        short_description,
        description,
        image,
        special_offer,
        slug
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return data || null
}

const MedicinePage = async ({params}) => {
  const medicine: MedicinePage | null = await getData(params.slug)
  console.log('🚀 ~ MedicinePage ~ medicine:', medicine)

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const pageTitle = medicine.name || 'Категория не найдена'

  const imagesStyles = 'relative col-span-2 w-full aspect-[3/2] rounded-[4px]'

  return (
    <Container width="2/3" className="space-y-20 mt-7">
      <div className="space-y-5">
        <Heading type="title" text={pageTitle} />

        <section data-index={medicine.slug.current} className="mt-14 mb-20">
          <div className="p-5 space-y-7 shadow-card rounded-md group sm:p-3">
            <div className="grid grid-cols-6 items-center gap-10 sm:gap-5 sm:flex-col">
              <div className={`relative ${imagesStyles}`}>
                <Image className="object-cover" src={urlForImage(medicine.image).url()} fill={true} sizes="25vw" alt={`${medicine.name}`} />
              </div>

              <div className="col-span-4 space-y-2 pr-10 sm:pr-2">
                <Text type="title" text={medicine.name} />

                <PortableText value={medicine.short_description} />
              </div>
            </div>

            <hr className="hidden sm:block" />
            <div className="pr-10 sm:pr-2">
              <PortableText value={medicine.description} />
            </div>
          </div>
        </section>
      </div>
      <Questions />
    </Container>
  )
}

export default MedicinePage
