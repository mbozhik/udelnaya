import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'

import Container from '#/Global/Container'
import Text from '#/UI/Text'
import Button from '#/UI/Button'
import Error from '#/UI/Error'

interface Promo {
  title: string
  caption: string
  id: number
  description?: any
  selection?: boolean
  shadow?: boolean
  image: Array<{asset: {url: string}}>
  slug: {current: string}
  [x: string]: any
}

async function getData(): Promise<Promo[]> {
  const data = await client.fetch<Promo[]>(
    `*[_type == 'promo'] {
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

const ProgramPage = async () => {
  const promos: Promo[] = await getData()

  if (!promos) {
    return <Error />
  }

  return (
    <Container width="2/3" className="space-y-20">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 mt-14">
        {promos
          .sort((a, b) => a.id - b.id)
          .map((promo, idx) => (
            <div key={idx} className="p-2 rounded-md space-y-7 sm:space-y-5 shadow-card group sm:p-3">
              <div className="flex flex-col items-center gap-10 h-[30vh] sm:h-[40vh] sm:gap-5">
                <div className="relative grid place-items-center w-full h-[45vh] rounded-[4px] overflow-hidden">
                  <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" width={1920} height={700} alt={`акция`} src={urlForImage(promo.image).url()} />

                  <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-25 sm:bg-opacity-30">
                    <div className="px-10 mt-2 space-y-2 text-white xl:px-5 sm:px-5 sm:w-full sm:text-center">
                      <div className={`space-y-0 xl:space-y-1 ${promo.selection && 'p-5 bg-custom-gray/40 rounded-md'}`}>
                        <Text type="title" className={`uppercase ${promo.shadow && 'text-shadow-title'}`} text={promo.title} />
                        <Text className={`${promo.shadow && 'text-shadow-text'}`} text={promo.caption} />
                      </div>

                      {promo.description && <Button type="link" className="px-3 py-1 w-fit sm:mx-auto sm:text-sm" adavanced_hover={true} href={`/sanatorium/promo/${promo.slug.current}`} text="Узнать детали" size="md" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  )
}

export default ProgramPage
