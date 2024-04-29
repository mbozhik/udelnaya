import {client, urlForImage, urlForFile} from '@/lib/sanity'

import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Button from '#/UI/Button'
import ImageSlider from '#/UI/ImageSlider'
import {revalidateOnTime} from '@/lib/utils'

interface ProgramPage {
  name: string
  duration: string
  description: any
  type: Array<{name: string; slug: string}>
  images: Array<{asset: {url: string}}>
  pdf: {asset: {_ref: string}}
  slug: {current: string}
}

async function getData(slug): Promise<ProgramPage | null> {
  const data = await client.fetch<ProgramPage>(
    `*[_type == 'programs' && slug.current == '${slug}'][0] {
        name,
        duration,
        description,
        type[] -> { name, slug },
        images,
        pdf,
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

const ProgramPage = async ({params}) => {
  const program: ProgramPage | null = await getData(params.slug)

  if (!program) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const generateSliderData = (images: Array<{asset: {url: string}}>) => {
    if (images.length > 1) {
      return images.map((image) => ({
        imageUrl: urlForImage(image.asset).url(),
      }))
    } else {
      return []
    }
  }

  const imagesStyles = 'relative w-full w-[20vw] aspect-square xl:w-full'

  return (
    <Container width="2/3">
      <section data-index={program.slug.current} className="mt-7">
        <div className="p-5 space-y-5 shadow-card group sm:p-3">
          <div className="grid items-center grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-7">
            {program.images.length > 1 ? (
              <ImageSlider className={imagesStyles} sliderData={generateSliderData(program.images)} />
            ) : (
              program.images.map((image, index) => (
                <div className={`relative ${imagesStyles}`} key={index}>
                  <Image className="object-cover" src={urlForImage(image.asset).url()} fill={true} sizes="25vw" alt={`${program.name}`} />
                </div>
              ))
            )}

            <div className="flex flex-col gap-5 xl:py-5 sm:py-0 sm:gap-5">
              <div className="space-y-2">
                <mark>
                  {program.type.map((type, index) => (
                    <span key={index}>{type.name}</span>
                  ))}
                </mark>

                <Heading type="title" text={program.name} />

                {program.duration && <h1>{program.duration}</h1>}
              </div>

              <div className="w-[90%] sm:w-full">
                <PortableText value={program.description} />
              </div>

              {program.pdf ? (
                <div className="flex gap-3">
                  <Button type="link" text="Узнать детали" size="lg" variant="secondary" className="w-fit" adavanced_hover={true} blank={true} href={urlForFile(program.pdf.asset._ref)} />
                  <Button type="button" text="Забронировать" size="lg" adavanced_hover={true} className="w-fit" />
                </div>
              ) : (
                <Button type="button" text="Забронировать" size="lg" adavanced_hover={true} className="w-fit" />
              )}
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default ProgramPage
