import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage, urlForFile} from '@/lib/sanity'

import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

interface ProgramPage {
  name: string
  duration: string
  description: any
  images: Array<{asset: {url: string}}>
  pdf: {asset: {_ref: string}}
  slug: {current: string}
}

const getData = async (slug): Promise<ProgramPage> => {
  noStore()

  const query = `
    *[_type == 'programs' && slug.current == '${slug}'][0] {
        name,
        duration,
        description,
        images,
        pdf,
        slug
    }`

  const data: ProgramPage = await client.fetch(query)
  return data
}

const ProgramPage = async ({params}) => {
  const program: ProgramPage = await getData(params.slug)
  console.log('🚀 ~ ProgramPage ~ program:', program)

  if (!program) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <section data-index={program.slug.current} className="grid w-[80%] mt-[20vh] mx-auto place-items-center">
      <div className="space-y-5 group border-[1.5px] border-custom-primary shadow-lg p-3">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex gap-5">
            {program.images.map((image, index) => (
              <div className="relative self-center w-full h-full overflow-hidden" key={index}>
                <Image className="object-cover" src={urlForImage(image).url()} fill={true} alt={`${program.name}`} />
              </div>
            ))}
          </div>

          <div className="self-center py-10 space-y-5">
            <div className="space-y-2">
              <Heading type="title" text={program.name} />

              {program.duration && <mark>{program.duration}</mark>}
            </div>

            <div className="w-[90%]">
              <PortableText value={program.description} />
            </div>

            {program.pdf && <Button type="link" text="Узнать детали" size="lg" variant="secondary" adavanced_hover={true} classes="w-fit" blank={true} href={urlForFile(program.pdf.asset._ref)} />}
          </div>
        </div>

        <Button type="button" text="Забронировать" size="lg" adavanced_hover={true} classes="w-full" />
      </div>
    </section>
  )
}

export default ProgramPage
