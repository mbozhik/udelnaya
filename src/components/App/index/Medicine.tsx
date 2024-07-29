import {client, urlForImage} from '@/lib/sanity'
import {revalidateTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Error from '#/UI/Error'

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
        revalidate: revalidateTime,
      },
    },
  )
  return Array.isArray(data) ? data : []
}

const Medicine = async () => {
  const medicine: Medicine[] = await getData()

  if (!medicine) {
    return <Error />
  }

  const blockData = medicine.map((section) => ({
    name: section.name,
    description: section.description,
    imageUrl: urlForImage(section.image).url(),
    special_offer: section.special_offer,
    slug: section.slug.current,
  }))

  return (
    <section data-section="medicine-index" className="space-y-7 sm:space-y-5">
      <Heading type="title" className="text-center" text="Медицина" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
        {blockData.map((item, index) => (
          <Link key={index} className="relative overflow-hidden group h-[27vh] sm:h-[25vh] rounded-md" href={`/medicine/${item.slug}`}>
            <Image quality={100} priority={true} className="object-cover w-full h-full block group-hover:scale-[102%] duration-500" src={item.imageUrl} fill={true} sizes="25vw" alt={`акция ${index + 1}`} />

            <div className="absolute bottom-0 w-[97%] sm:w-[97.5%] px-4 py-2.5 sm:px-3 sm:py-1.5 m-2 sm:m-1 rounded-[4px] bg-white/75 sm:bg-white group-hover:bg-white duration-300">
              <Text type="title" text={item.name} className="font-normal sm:text-xl" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Medicine
