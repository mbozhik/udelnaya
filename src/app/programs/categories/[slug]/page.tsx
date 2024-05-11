import {client, urlForImage, urlForFile} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import PortableBlock from '#/UI/PortableBlock'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import ImageSlider from '#/UI/ImageSlider'
import Questions from '##/index/Questions'
import Error from '#/UI/Error'

interface ProgramPage {
  name: string
  duration: string
  short_description: any
  type: Array<{name: string; slug: {current: string}}>
  images: Array<{asset: {url: string}}>
  pdf: {asset: {_ref: string}}
  slug: {current: string}
  [x: string]: any
}

async function getData(): Promise<ProgramPage> {
  const data = await client.fetch<ProgramPage>(
    `*[_type == 'programs'] {
        name,
        duration,
        short_description,
        type[] -> { name, slug },
        images,
        pdf,
        slug,
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return data
}

const ProgramPage = async ({params}) => {
  const programs: ProgramPage = await getData()

  if (!programs) {
    return <Error />
  }

  const categorizedPrograms: ProgramPage[] = programs.filter((program) => {
    return program.type.some((type) => type.slug.current === params.slug)
  })

  const pageTitle = categorizedPrograms.flatMap((program) => program.type).find((type) => type.slug.current === params.slug)?.name || 'Категория не найдена'

  const generateSliderData = (images: Array<{asset: {url: string}}>) => {
    if (images.length > 1) {
      return images.map((image) => ({
        imageUrl: urlForImage(image.asset).url(),
      }))
    } else {
      return []
    }
  }

  const imagesStyles = 'relative col-span-2 w-full aspect-[3/2] rounded-[4px]'

  return (
    <Container width="2/3" className="space-y-20 mt-7">
      <div className="space-y-5">
        <Heading type="title" text={pageTitle} />
        <section data-index={params.slug} className="space-y-5">
          {categorizedPrograms.map((program, index) => (
            <Link className="grid grid-cols-6 sm:flex sm:flex-col items-center gap-10 px-3 py-5 rounded-md sm:gap-5 shadow-card group" href={`/programs/${program.slug.current}`} key={index}>
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

              <div className="col-span-4 space-y-4 pr-10 sm:pr-2">
                <div className="space-y-1">
                  <Text type="title" text={program.name} />
                  <mark className="bg-custom-gray">{program.duration}</mark>
                </div>

                <PortableBlock value={program.short_description} />
              </div>
            </Link>
          ))}
        </section>
      </div>

      <Questions />
    </Container>
  )
}

export default ProgramPage
