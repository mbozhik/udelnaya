import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'
import PortableBlock from '#/UI/PortableBlock'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
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

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const pageTitle = medicine.name || 'Категория не найдена'

  const imagesStyles = 'relative col-span-2 w-full aspect-[3/2] rounded-[4px]'

  return (
    <Container width="2/3" className="space-y-20 mt-7">
      <div className="space-y-5">
        <Heading type="title" text={pageTitle} />

        <section data-index={medicine.slug.current} className="mb-20 mt-14">
          <div className="p-5 rounded-md space-y-7 sm:space-y-3 shadow-card group sm:p-3">
            <div className="grid items-center grid-cols-6 gap-10 sm:flex sm:flex-col sm:gap-5">
              <div className={`relative ${imagesStyles}`}>
                <Image quality={100} className="object-cover" src={urlForImage(medicine.image).url()} fill={true} sizes="25vw" alt={`${medicine.name}`} />
              </div>

              <div className="col-span-4 pr-10 space-y-2 sm:pr-2">
                <Text type="title" text={medicine.name} />

                <PortableBlock value={medicine.short_description} />
              </div>
            </div>

            <hr className="hidden sm:block" />

            <PortableBlock prose={true} className="w-full" value={medicine.description} />
          </div>
        </section>
      </div>
      <Questions />
    </Container>
  )
}

export default MedicinePage
