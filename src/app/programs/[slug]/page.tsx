import {client, urlForImage, urlForFile} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import Container from '#/Global/Container'
import ImageSlider from '#/UI/ImageSlider'
import Text from '#/UI/Text'
import Button from '#/UI/Button'
import Questions from '##/index/Questions'

interface ProgramPage {
  name: string
  duration: string
  short_description: any
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
        short_description,
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

  const imagesStyles = 'relative w-full w-[20vw] aspect-video xl:w-full rounded-[4px]'

  return (
    <Container width="2/3">
      <section data-index={program.slug.current} className="mt-14 mb-20">
        <div className="p-5 space-y-7 shadow-card rounded-md group sm:p-3">
          <div className="flex items-center gap-10 sm:gap-5 sm:flex-col">
            <>
              {program.images.length > 1 ? (
                <ImageSlider className={imagesStyles} sliderData={generateSliderData(program.images)} />
              ) : (
                program.images.map((image, index) => (
                  <div className={`relative ${imagesStyles}`} key={index}>
                    <Image quality={100} className="object-cover" src={urlForImage(image.asset).url()} fill={true} sizes="25vw" alt={`${program.name}`} />
                  </div>
                ))
              )}
            </>

            <div className="space-y-4 pr-10 sm:pr-2">
              <div className="space-y-1">
                <Text type="title" text={program.name} />
                <mark className="bg-custom-gray">{program.duration}</mark>
              </div>

              <div className="tracking-tight sm:text-sm">
                <PortableText value={program.short_description} />
              </div>
            </div>
          </div>

          <div className="space-y-7 sm:space-y-5">
            <hr className="hidden sm:block" />
            <div className="pr-10 sm:pr-2 tracking-tight sm:text-sm">
              <PortableText value={program.description} />
            </div>

            {program.pdf && <Button type="link" text="Узнать детали" size="lg" variant="secondary" className="sm:w-full sm:py-3" adavanced_hover={true} blank={true} href={urlForFile(program.pdf.asset._ref)} />}
          </div>
        </div>
      </section>

      <Questions />
    </Container>
  )
}

export default ProgramPage
