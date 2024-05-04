import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {PortableImage} from '#/UI/PortableImage'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Questions from '##/index/Questions'

interface MedicinePage {
  name: string
  procedures?: Array<{name: string; description: any; slug: {current: string}}>
  short_description: any
  image: Array<{asset: {url: string}}>
  special_offer: boolean
  slug: {current: string}
}

async function getData(): Promise<MedicinePage | null> {
  const data = await client.fetch<MedicinePage>(
    `*[_type == 'medicine' && slug.current == 'procedury'][0] {
        name,
        procedures[] -> { name, description, slug },
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

        <section data-index={medicine.slug.current} className="mb-20 mt-14">
          <div className="p-5 space-y-10 rounded-md sm:space-y-7 shadow-card group sm:p-3">
            <div className="grid items-center grid-cols-6 gap-10 sm:flex sm:flex-col sm:gap-5">
              <div className={`relative ${imagesStyles}`}>
                <Image quality={100} className="object-cover" src={urlForImage(medicine.image).url()} fill={true} sizes="25vw" alt={`${medicine.name}`} />
              </div>

              <div className="col-span-4 pr-10 space-y-2 sm:pr-2">
                <Text type="title" text={medicine.name} />

                <PortableText value={medicine.short_description} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
              {medicine.procedures.map((procedure, index) => (
                <Link className="py-5 text-center text-white duration-300 rounded-md bg-custom-primary hover:bg-custom-gray" href={`/medicine/procedury/${procedure.slug.current}`} key={index}>
                  {procedure.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Questions />
    </Container>
  )
}

export default ProgramPage
