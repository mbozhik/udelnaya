import {client, urlForImage} from '@/lib/sanity'

import {isMobile} from '@bozzhik/is-mobile'
import {revalidateOnTime} from '@/lib/utils'

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

async function getData(): Promise<Program[]> {
  const data = await client.fetch<Program>(
    `*[_type == 'programs'] {
        name,
        short_description,
        images,
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

const Program = async () => {
  const programs: Program[] = await getData()

  if (!programs) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const slides = programs.map((program, idx) => (
    <Link className="flex flex-col justify-between gap-4 p-3 pb-4 rounded-md xl:gap-3 shadow-card group" href={`/programs/${program.slug.current}`} key={idx}>
      <div className="relative self-center w-full overflow-hidden aspect-video group">
        <Image className="object-cover w-full h-full group-hover:scale-[102%] duration-500 rounded-[4px]" src={urlForImage(program.images[0]).url()} fill={true} sizes="25vw" alt={`program 0`} />
      </div>

      <div>
        <Text type="title" text={program.name} />
        <Text classes="line-clamp-3" type="caption" text={program.short_description} />
      </div>
    </Link>
  ))

  return (
    <section data-section="programs-index" className="space-y-7 xl:space-y-5">
      <Heading type="title" classes="text-center" text="Программы" />

      <div className="grid items-start grid-cols-3 gap-3 sm:grid-cols-1">{slides}</div>
      <Button type="link" href="/programs" variant="secondary" adavanced_hover={true} size="lg" classes="w-full border-[1.5px]" text="Все программы" />
    </section>
  )
}

export default Program
