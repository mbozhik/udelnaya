import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import Heading from '#/UI/Heading'

interface Medicine {
  name: string
  description: string
  image: {asset: {url: string}}
  special_offer: boolean
  slug: {current: string}
}

async function getData(): Promise<Medicine[]> {
  const data = await client.fetch<Medicine>(
    `*[_type == 'medicine'] {
        name,
        description,
        image,
        special_offer,
        slug
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return Array.isArray(data) ? data : []
}

const Medicine = async () => {
  const medicine: Medicine[] = await getData()

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliderData = medicine.map((section) => ({
    name: section.name,
    description: section.description,
    imageUrl: urlForImage(section.image).url(),
    special_offer: section.special_offer,
    slug: section.slug.current,
  }))

  return (
    <section data-section="medicine-index" className="space-y-7">
      <Heading type="title" classes="text-center" text="Медицина" />

      <div className="flex justify-between items-center gap-3">
        {sliderData.map((slide, index) => (
          <Link key={index} className="relative grid w-full h-[40vh] overflow-hidden place-items-center group" href={`/procedure/${slide.slug}`}>
            <Image quality={100} priority={true} className="object-cover w-full h-full  group-hover:scale-[103%] duration-500" src={slide.imageUrl} fill={true} sizes="25vw" alt={`акция ${index + 1}`} />

            <div className="absolute inset-0 flex flex-col justify-end bg-black/40">
              <div className="p-5 xl:p-3 w-[92%] space-y-2 sm:space-y-1 text-white flex flex-col justify-between h-full">
                {slide.special_offer ? <mark>АКЦИЯ</mark> : <span></span>}
                <Heading type="subtitle" text={slide.name} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Medicine
