import {client, urlForImage} from '@/lib/sanity'
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
  selection?: boolean
  shadow?: boolean
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
      selection,
      shadow,
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
      <section data-index={promo.slug.current} className="mb-20 mt-14">
        <div className="p-5 rounded-md space-y-7 sm:space-y-5 shadow-card group sm:p-3">
          <div className="flex flex-col items-center gap-10 sm:gap-5">
            <div className="relative grid place-items-center w-full h-[45vh] rounded-md overflow-hidden">
              <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" width={1920} height={700} alt={`акция`} src={urlForImage(promo.image).url()} />

              <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-10">
                <div className="pl-[5%] sm:pl-0 sm:w-full mt-5 space-y-3 sm:-space-y-1 text-white sm:text-center">
                  <div className={`space-y-2 xl:space-y-1 w-[43vw] xl:w-[50vw] sm:w-full ${promo.selection && 'p-5 bg-custom-gray/40 rounded-md'}`}>
                    <h1 className={`text-6xl font-medium uppercase xl:text-5xl sm:text-3xl max-w-[20ch] sm:w-full sm:mx-auto ${promo.shadow && 'text-shadow-title'}`}>{promo.title}</h1>
                    <Heading type="caption" className={`text-lg sm:w-full sm:mx-auto xl:text-base ${promo.shadow && 'text-shadow-text'}`} text={promo.caption} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pr-[25%] sm:pr-2">
            <Text type="title" className="text-2xl" text={promo.title} />
            <div className="prose prose-li:marker:text-custom-primary">
              <PortableText value={promo.description} />
            </div>
          </div>
        </div>
      </section>

      <Questions />
    </Container>
  )
}

export default ProgramPage
