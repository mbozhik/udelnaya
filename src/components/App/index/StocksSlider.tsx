'use client'

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Autoplay} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '@/assets/stylesheets/stocks_slider.css'

interface SliderProps {
  sliderData: {
    imageUrl: string
    title: string
    caption: string
  }[]
  classes: string
}

const Slider: React.FC<SliderProps> = ({sliderData, classes}) => {
  return (
    <Swiper className={classes} loop={true} speed={1000} autoplay={{delay: 3000}} pagination={{clickable: true}} grabCursor={true} modules={[Pagination, Autoplay]}>
      {sliderData.map((slide, index) => (
        <SwiperSlide className="relative grid place-items-center" key={index}>
          <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" src={slide.imageUrl} fill={true} alt={`акция ${index + 1}`} />

          <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50">
            <div className="w-[70%] sm:w-[90%] mt-5 mx-auto space-y-2 text-white sm:text-center">
              <h2 className="text-6xl font-medium uppercase xl:text-4xl xl:w-[80%] sm:text-3xl sm:w-full sm:mx-auto">{slide.title}</h2>
              <p className="text-xl font-light sm:text-base sm:w-full sm:mx-auto">{slide.caption}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
