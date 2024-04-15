'use client'

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import Heading from '#/UI/Heading'

interface SliderProps {
  sliderData: {
    name: string
    description: string
    imageUrl: string
    price: number
    // slug: {current: string}
  }[]
  classes: string
}

const Slider: React.FC<SliderProps> = ({sliderData, classes}) => {
  return (
    <Swiper data-section="stocks-index" className={classes} slidesPerView={2} loop={true} speed={1000} pagination={{clickable: true}} modules={[Pagination]}>
      {sliderData.map((slide, index) => (
        <SwiperSlide className="relative grid place-items-center" key={index}>
          <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" src={slide.imageUrl} fill={true} alt={`акция ${index + 1}`} />

          <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50">
            <div className="w-[90%] sm:w-[90%] mt-5 mx-auto space-y-2 text-white sm:text-center">
              <Heading type="title" text={slide.name} />
              <Heading type="caption" classes="font-light sm:w-full sm:mx-auto line-clamp-4" text={slide.description} />
              <mark>{slide.price}</mark>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
