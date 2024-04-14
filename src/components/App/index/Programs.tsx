import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import Link from 'next/link'
import Image from 'next/image'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

interface Program {
  name: string
  short_description: string
  images: Array<{asset: {url: string}}>
  slug: {current: string}
}

const getData = async (): Promise<Program[]> => {
  noStore()

  const query = `
    *[_type == 'programs'] {
        name,
        short_description,
        images,
        slug
    }`

  const data: Program[] = await client.fetch(query)
  return data
}

const Program = async () => {
  const programs: Program[] = await getData()

  if (!programs) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <section data-section="programs-index" className="mt-20 space-y-10 sm:space-y-7">
      <Heading type="title" classes="text-center" text="Программы" />

      <div className="grid items-start grid-cols-4 gap-5 xl:grid-cols-2 sm:grid-cols-1">
        {programs.map((program, idx) => (
          <Link className="flex flex-col justify-between border-[1.5px] border-custom-teal shadow-lg p-3 gap-5 group" href={`/program/${program.slug.current}`} key={idx}>
            {program.images && program.images.length > 0 && (
              <div className="relative self-center w-full aspect-square xl:aspect-video">
                <Image src={urlForImage(program.images[0]).url()} className="object-cover w-full h-full" fill={true} alt={`program 0`} />
              </div>
            )}

            <div className="space-y-1">
              <Text type="title" text={program.name} />
              <Text classes="line-clamp-3 xl:line-clamp-2 sm:line-clamp-3" type="caption" text={program.short_description} />
            </div>

            <Button type="button" text="Подробнее" size="md" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Program
