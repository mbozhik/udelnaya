import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

interface ProgramCategories {
  name: string
  description: string
  id: number
  image: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(): Promise<ProgramCategories[]> {
  const data = await client.fetch<ProgramCategories>(
    `*[_type == 'programs_category'] {
        name,
        description,
        id,
        image,
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

const ProgramCategories = async () => {
  const programCategories: ProgramCategories[] = await getData()

  if (!programCategories) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const slides = programCategories
    .sort((a, b) => a.id - b.id)
    .map((category, idx) => (
      <Link className="flex flex-col justify-between gap-4 p-3 pb-4 rounded-md xl:gap-3 shadow-card group" href={`/programs/categories/${category.slug.current}`} key={idx}>
        <div className="relative self-center w-full overflow-hidden aspect-video group">
          <Image className="object-cover w-full h-full group-hover:scale-[102%] duration-500 rounded-[4px]" src={urlForImage(category.image).url()} fill={true} sizes="25vw" alt={category.name} />
        </div>

        <div>
          <Text type="title" text={category.name} />
          <Text type="caption" text={category.description} />
        </div>
      </Link>
    ))

  return (
    <section data-section="programs-index" className="space-y-7 xl:space-y-5">
      <Heading type="title" className="text-center" text="Программы" />

      <div className="grid items-start grid-cols-3 gap-3 sm:grid-cols-1">{slides}</div>
    </section>
  )
}

export default ProgramCategories
