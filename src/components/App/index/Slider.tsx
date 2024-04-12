/* eslint-disable @next/next/no-async-client-component */
'use client'

import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import Image from 'next/image'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Autoplay, EffectFade} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const getData = async () => {
  noStore()

  const query = `
    *[_type == 'stocks'] {
      images
    }`

  const data = await client.fetch(query)
  return data
}

const Slider = async () => {
  const stocks = await getData()

  if (!stocks) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const images = stocks.map((stock) => stock.images).flat()

  return (
    <Swiper modules={[Pagination, Autoplay, EffectFade]} pagination={{clickable: true}} autoplay={{delay: 3500}} effect={'fade'} grabCursor={true} loop={true} className="mySwiper w-full h-[60vh] xl:h-[65vh] sm:h-[45vh]">
      {images.map((image, index) => (
        <SwiperSlide className="relative grid place-items-center" key={index}>
          <Image
            src={urlForImage(image).url()} // Use custom image loader
            className="absolute inset-0 block object-cover s-full"
            alt={`stock ${index}`}
            width={1920}
            height={1080}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
