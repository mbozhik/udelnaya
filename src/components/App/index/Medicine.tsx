import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import Link from 'next/link'
import Image from 'next/image'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

interface Medicine {
  name: string
  description: string
  image: {asset: {url: string}}
  slug: {current: string}
}

const getData = async (): Promise<Medicine[]> => {
  noStore()

  const query = `
    *[_type == 'medicine'] {
        name,
        description,
        image,
        price,
        slug
    }`

  const data: Medicine[] = await client.fetch(query)
  return data
}

const Program = async () => {
  const medicine: Medicine[] = await getData()

  if (!medicine) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <section data-section="medicine-index" className="mt-20 space-y-10">
      <Heading type="title" classes="text-center" text="Медицина" />

      <div className="grid items-start grid-cols-2 gap-3 sm:grid-cols-1">
        {medicine.slice(0, 2).map((procedure, idx) => (
          <Link className="relative flex flex-col justify-between" href={`/procedure/${procedure.slug.current}`} key={idx}>
            <Text type="title" text={procedure.name} classes="text-center text-white bg-custom-teal py-2 sm:text-xl font-normal !tracking-normal" />

            {procedure.image && (
              <div className="relative self-center w-full overflow-hidden aspect-video group">
                <Image src={urlForImage(procedure.image).url()} className="object-cover w-full h-full duration-500 group-hover:scale-[102%]" fill={true} alt={`program 0`} />
              </div>
            )}
          </Link>
        ))}
      </div>

      <Button type="link" href="/medicine" size="lg" variant="secondary" adavanced_hover={true} classes="w-full" text="Процедуры" />
    </section>
  )
}

export default Program
