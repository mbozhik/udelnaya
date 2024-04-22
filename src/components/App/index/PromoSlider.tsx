'use client'

import {isMobile} from '@bozzhik/is-mobile'

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Autoplay} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '%%/stylesheets/promo_slider.css'

import Heading from '#/UI/Heading'

interface SliderProps {
  sliderData: {
    title: string
    caption: string
    imageUrl: string
  }[]
  classes: string
}

const Slider: React.FC<SliderProps> = ({sliderData, classes}) => {
  return (
    <Swiper data-section="promo-index" className={classes} loop={true} speed={1000} autoplay={{delay: 3000}} pagination={{clickable: true}} grabCursor={true} modules={[Pagination, Autoplay]}>
      {sliderData.map((slide, index) => (
        <SwiperSlide className="relative grid place-items-center" key={index}>
          {!isMobile ? (
            <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" src={slide.imageUrl} width="1920" height="700" alt={`акция ${index + 1}`} /> // desktop
          ) : (
            <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" src={slide.imageUrl} width="450" height="900" alt={`акция ${index + 1}`} />
          )}

          <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-10">
            <div className="w-[75%] xl:w-[85%] mx-auto mt-5 space-y-2 xl:space-y-1 text-white sm:text-center">
              <h2 className="text-6xl xl:text-5xl sm:text-3xl font-medium uppercase max-w-[20ch] sm:w-full sm:mx-auto">{slide.title}</h2>
              <Heading type="caption" classes="sm:w-full sm:mx-auto text-lg xl:text-base" text={slide.caption} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
