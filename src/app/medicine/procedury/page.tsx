import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import PortableBlock from '#/UI/PortableBlock'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Questions from '##/index/Questions'

interface ProceduryPageProps {
  name: string
  procedures?: Array<{name: string; description: any; slug: {current: string}}>
  short_description: any
  description: any
  image: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(): Promise<ProceduryPageProps | null> {
  const data = await client.fetch<ProceduryPageProps>(
    `*[_type == 'medicine' && slug.current == 'procedury'][0] {
        name,
        procedures[] -> { name, description, slug },
        short_description,
        description,
        image,
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

const ProceduryPage = async () => {
  const medicine: ProceduryPageProps | null = await getData()

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const gridConfig = {
    global: 'grid-cols-7',
    image: 'col-span-3',
    text: 'col-span-4',
  }

  const imagesStyles = `relative w-full h-full aspect-[3/2] rounded-[4px] ${gridConfig.image}`

  return (
    <Container width="2/3" className="space-y-20 mt-7">
      <div className="space-y-5">
        <Heading type="title" text={medicine.name} />

        <section data-index={medicine.slug.current} className="mb-20 mt-14">
          <div className="p-5 space-y-12 rounded-md sm:space-y-7 shadow-card group sm:p-3">
            <div className={`grid items-center ${gridConfig.global} gap-10 sm:flex sm:flex-col sm:gap-5`}>
              <div className={`relative ${imagesStyles}`}>
                <Image quality={100} className="object-cover" src={urlForImage(medicine.image).url()} fill={true} sizes="25vw" alt={`${medicine.name}`} />
              </div>

              <PortableBlock className={`${gridConfig.text} pr-10`} value={medicine.short_description} />
            </div>

            <PortableBlock className="pr-10" value={medicine.description} />

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
              {medicine.procedures.map((procedure, index) => (
                <Link className="p-5 text-center text-white duration-300 rounded-md bg-custom-primary hover:bg-custom-gray" href={`/medicine/procedury/${procedure.slug.current}`} key={index}>
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

export default ProceduryPage
