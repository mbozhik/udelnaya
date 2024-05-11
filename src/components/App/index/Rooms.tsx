import {client, urlForImage} from '@/lib/sanity'

import Heading from '#/UI/Heading'
import RoomsSlider from '##/index/RoomsSlider'
import {revalidateOnTime} from '@/lib/utils'
import Error from '#/UI/Error'

interface Room {
  name: string
  description: string
  specification: any
  images: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(): Promise<Room[]> {
  const data = await client.fetch<Room>(
    `*[_type == 'rooms'] {
        name,
        description,
        specification,
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

const Rooms = async () => {
  const rooms: Room[] = await getData()

  if (!rooms) {
    return <Error />
  }

  const sliderData = rooms.map((room) => ({
    name: room.name,
    description: room.description,
    specification: room.specification,
    imageUrls: room.images.map((image) => urlForImage(image.asset).url()),
    slug: room.slug.current,
  }))

  return (
    <section id="rooms" data-section="rooms-index" className="space-y-7 sm:space-y-5 scroll-m-[10rem] sm:scroll-m-[7rem]">
      <Heading type="title" className="text-center" text="Номера" />

      <RoomsSlider sliderData={sliderData} className="w-full rounded-md" />
    </section>
  )
}

export default Rooms
