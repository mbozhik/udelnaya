import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {PortableImage} from '#/UI/PortableImage'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Questions from '##/index/Questions'

interface MedicinePage {
  name: string
  short_description: any
  image: Array<{asset: {url: string}}>
  special_offer: boolean
  slug: {current: string}
}

async function getData(): Promise<MedicinePage | null> {
  const data = await client.fetch<MedicinePage>(
    `*[_type == 'medicine' && slug.current == 'procedury'][0] {
        name,
        short_description,
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

const ProgramPage = async () => {
  const medicine: MedicinePage | null = await getData()

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const imagesStyles = 'relative col-span-2 w-full aspect-[3/2] rounded-[4px]'

  return (
    <Container width="2/3" className="space-y-20 mt-7">
      <div className="space-y-5">
        <Heading type="title" text={medicine.name} />

        <section data-index={medicine.slug.current} className="mt-14 mb-20">
          <div className="p-5 space-y-10 sm:space-y-3 shadow-card rounded-md group sm:p-3">
            <div className="grid grid-cols-6 sm:flex sm:flex-col items-center gap-10 sm:gap-5">
              <div className={`relative ${imagesStyles}`}>
                <Image quality={100} className="object-cover" src={urlForImage(medicine.image).url()} fill={true} sizes="25vw" alt={`${medicine.name}`} />
              </div>

              <div className="col-span-4 space-y-2 pr-10 sm:pr-2">
                <Text type="title" text={medicine.name} />

                <PortableText value={medicine.short_description} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <h1 className="bg-custom-primary w-full text-white text-center py-5">1</h1>
              <h1 className="bg-custom-primary w-full text-white text-center py-5">2</h1>
              <h1 className="bg-custom-primary w-full text-white text-center py-5">3</h1>
              <h1 className="bg-custom-primary w-full text-white text-center py-5">4</h1>
              <h1 className="bg-custom-primary w-full text-white text-center py-5">5</h1>
              <h1 className="bg-custom-primary w-full text-white text-center py-5">6</h1>
            </div>
          </div>
        </section>
      </div>
      <Questions />
    </Container>
  )
}

export default ProgramPage
