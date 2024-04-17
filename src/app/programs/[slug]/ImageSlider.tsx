'use client'

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Autoplay} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '%%/stylesheets/promo_slider.css'

interface SliderProps {
  sliderData: {
    imageUrl: string
  }[]
  classes: string
}

const Slider: React.FC<SliderProps> = ({sliderData, classes}) => {
  return (
    <Swiper data-section="promo-index" className={classes} loop={true} speed={1000} autoplay={{delay: 3000}} pagination={{clickable: true}} grabCursor={true} modules={[Pagination, Autoplay]}>
      {sliderData.map((slide, index) => (
        <SwiperSlide className="w-full h-full" key={index}>
          <Image quality={100} priority={true} className="object-cover s-full" src={slide.imageUrl} fill={true} sizes="50vw" alt={`акция ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
