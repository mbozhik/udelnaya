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
  [x: string]: any
}

async function getData(): Promise<ProgramPage> {
  const data = await client.fetch<ProgramPage>(
    `*[_type == 'programs'] {
        name,
        duration,
        description,
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
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const categorizedPrograms: ProgramPage = programs.filter((program) => {
    return program.type.some((type) => type.slug.current === params.slug)
  })

  const generateSliderData = (images: Array<{asset: {url: string}}>) => {
    if (images.length > 1) {
      return images.map((image) => ({
        imageUrl: urlForImage(image.asset).url(),
      }))
    } else {
      return []
    }
  }

  const imagesStyles = 'relative s-36 aspect-square'

  return (
    <Container width="2/3">
      <h1>{params.slug}</h1>
      <section data-index={params.slug}>
        {categorizedPrograms.map((program, index) => (
          <div key={index} className="border-custom-primary border">
            <h1>{program.name}</h1>
            <p>{program.duration}</p>

            {program.images.length > 1 ? (
              <ImageSlider className={imagesStyles} sliderData={generateSliderData(program.images)} />
            ) : (
              program.images.map((image, index) => (
                <div className={`relative ${imagesStyles}`} key={index}>
                  <Image className="object-cover" src={urlForImage(image.asset).url()} fill={true} sizes="25vw" alt={`${program.name}`} />
                </div>
              ))
            )}

            <mark>
              {program.type.map((type, index) => (
                <span key={index}>{type.slug.current}</span>
              ))}
            </mark>
          </div>
        ))}
      </section>
    </Container>
  )
}

export default ProgramPage
