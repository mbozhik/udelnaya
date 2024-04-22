import {client, urlForImage, urlForFile} from '@/lib/sanity'

import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import Container from '#/UI/Container'
import Heading from '#/UI/Heading'
import Button from '#/UI/Button'
import ImageSlider from '#/UI/ImageSlider'
import {revalidateOnTime} from '@/lib/utils'

interface ProgramPage {
  name: string
  duration: string
  description: any
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

  const imagesStyles = 'relative w-full h-[50vh] xl:h-full sm:h-[50vh]'

  return (
    <Container width="3/4">
      <section data-index={program.slug.current} className="grid mx-auto place-items-center">
        <div className="space-y-5 group border-[1.5px] border-custom-primary shadow-lg p-5 sm:p-3">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-10 sm:gap-7 items-center">
            {program.images.length > 1 ? (
              <ImageSlider classes={imagesStyles} sliderData={generateSliderData(program.images)} />
            ) : (
              program.images.map((image, index) => (
                <div className={`relative ${imagesStyles}`} key={index}>
                  <Image className="object-cover" src={urlForImage(image.asset).url()} fill={true} sizes="25vw" alt={`${program.name}`} />
                </div>
              ))
            )}

            <div className="flex flex-col gap-5 xl:py-5 sm:py-0 sm:gap-5">
              <div className="space-y-2">
                <Heading type="title" text={program.name} />

                {program.duration && <mark>{program.duration}</mark>}
              </div>

              <div className="w-[90%] sm:w-full">
                <PortableText value={program.description} />
              </div>

              {program.pdf ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                  <Button type="link" text="Узнать детали" size="lg" variant="secondary" adavanced_hover={true} blank={true} href={urlForFile(program.pdf.asset._ref)} />
                  <Button type="button" text="Забронировать" size="lg" adavanced_hover={true} classes="w-full" />
                </div>
              ) : (
                <Button type="button" text="Забронировать" size="lg" adavanced_hover={true} classes="w-full" />
              )}
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default ProgramPage
