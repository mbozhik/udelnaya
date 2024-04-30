import {client, urlForImage, urlForFile} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Questions from '##/index/Questions'

interface Promo {
  title: string
  caption: string
  id: number
  description?: any
  image: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(slug): Promise<Promo> {
  const data = await client.fetch<Promo>(
    `*[_type == 'promo' && slug.current == '${slug}'][0] {
      title,
      caption,
      id,
      description,
      image,
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
  const promo: Promo = await getData(params.slug)

  if (!promo) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <Container width="2/3" className="space-y-20">
      <section data-index={promo.slug.current} className="mt-14 mb-20">
        <div className="p-5 space-y-7 sm:space-y-5 shadow-card rounded-md group sm:p-3">
          <div className="flex flex-col items-center gap-10 sm:gap-5">
            <div className="relative grid place-items-center w-full h-[45vh] rounded-[4px]">
              <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" width={1920} height={700} alt={`акция`} src={urlForImage(promo.image).url()} />

              <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-10">
                <div className="w-[85%] mx-auto mt-5 space-y-3 text-white sm:text-center">
                  <div className="space-y-2 xl:space-y-1">
                    <Heading type="title" className="max-w-[30ch]" text={promo.title}></Heading>
                    <Heading type="caption" className="sm:w-full sm:mx-auto text-lg xl:text-base" text={promo.caption} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pr-[25%]">
            <Text type="title" className="text-2xl" text={promo.title} />
            <PortableText value={promo.description} />
          </div>
        </div>
      </section>

      <Questions />
    </Container>
  )
}

export default ProgramPage
