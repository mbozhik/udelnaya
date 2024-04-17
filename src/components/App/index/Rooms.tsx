import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import {isMobile} from '@bozzhik/is-mobile'

import Link from 'next/link'
import Image from 'next/image'

import Heading from '#/UI/Heading'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

interface Room {
  name: string
  description: string
  images: Array<{asset: {url: string}}>
  slug: {current: string}
}

const getData = async (): Promise<Room[]> => {
  noStore()

  const query = `
    *[_type == 'rooms'] {
        name,
        description,
        images,
        slug
    }`

  const data: Room[] = await client.fetch(query)
  return data
}

const Room = async () => {
  const rooms: Room[] = await getData()

  if (!rooms) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliceStart = isMobile ? 0 : 0
  const sliceEnd = isMobile ? 2 : 4

  const slides = rooms.slice(sliceStart, sliceEnd).map((room, idx) => (
    <Link className="flex flex-col h-[50vh] xl:h-auto justify-between border-[1.5px] border-custom-primary shadow-lg p-3 gap-5 group" href={`/rooms/${room.slug.current}`} key={idx}>
      <div className="relative self-center w-full overflow-hidden aspect-square xl:aspect-video group">
        <Image className="object-cover w-full xl:h-[40vh] group-hover:scale-[103%] duration-500" src={urlForImage(room.images[0]).url()} fill={true} sizes="25vw" alt={`room 0`} />
      </div>

      <div className="space-y-1">
        <Text type="title" text={room.name} />
        <Text classes="line-clamp-2 sm:line-clamp-3" type="caption" text={room.description} />
      </div>

      <Button type="button" text="Подробнее" size="md" />
    </Link>
  ))

  return (
    <section data-section="rooms-index" className="space-y-7 sm:space-y-7">
      <Heading type="title" classes="text-center" text="Номера" />

      <div className="grid items-start grid-cols-3 gap-5 xl:grid-cols-2 sm:grid-cols-1">{slides}</div>
      {/* <Button type="link" href="/rooms" variant="secondary" adavanced_hover={true} size="lg" classes="w-full border-[1.5px]" text="Все номера" /> */}
    </section>
  )
}

export default Room
