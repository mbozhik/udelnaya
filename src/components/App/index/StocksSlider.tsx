'use client'

import {urlForImage} from '@/lib/sanity'

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Autoplay} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '@/assets/stylesheets/stocks_slider.css'

interface SliderProps {
  images: string[]
  classes: string
}

const Slider: React.FC<SliderProps> = ({images, classes}) => {
  return (
    <Swiper className={classes} loop={true} autoplay={{delay: 3500}} speed={1000} pagination={true} grabCursor={true} modules={[Pagination, Autoplay]}>
      {images.map((image, index) => (
        <SwiperSlide className="relative grid place-items-center" key={index}>
          <Image className="absolute inset-0 block object-cover s-full" src={urlForImage(image).url()} fill={true} alt={`slide-${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
