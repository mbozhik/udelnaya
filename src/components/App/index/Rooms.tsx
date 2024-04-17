import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import Heading from '#/UI/Heading'
import RoomsSlider from '##/index/RoomsSlider'

interface Room {
  name: string
  description: string
  specification: any
  images: Array<{asset: {url: string}}>
  slug: {current: string}
}

const getData = async (): Promise<Room[]> => {
  noStore()

  const query = `
    *[_type == 'rooms'] {
        name,
        description,
        specification,
        images,
        slug
    }`

  const data: Room[] = await client.fetch(query)
  return data
}

const Rooms = async () => {
  const rooms: Room[] = await getData()

  if (!rooms) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliderData = rooms.map((room) => ({
    name: room.name,
    description: room.description,
    specification: room.specification,
    imageUrls: room.images.map((image) => urlForImage(image.asset).url()),
    slug: room.slug.current,
  }))

  return (
    <section data-section="rooms-index" className="space-y-7">
      <Heading type="title" classes="text-center" text="Номера" />

      <RoomsSlider sliderData={sliderData} classes="w-full" />
    </section>
  )
}

export default Rooms
