'use client'

import Link from 'next/link'
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import '%%/stylesheets/medicine_slider.css'

import Heading from '#/UI/Heading'

interface SliderProps {
  sliderData: {
    name: string
    description: string
    imageUrl: string
    special_offer: boolean
    slug: string
  }[]
  classes: string
}

const Slider: React.FC<SliderProps> = ({sliderData, classes}) => {
  return (
    <Swiper data-section="stocks-index" className={classes} slidesPerView={2} spaceBetween={10} loop={true} speed={1000} navigation={true} modules={[Navigation]}>
      {sliderData.map((slide, index) => (
        <SwiperSlide key={index}>
          <Link className="relative grid place-items-center w-full h-full group overflow-hidden" href={`/procedure/${slide.slug}`}>
            <Image quality={100} priority={true} className="object-cover s-full group-hover:scale-[103%] duration-500" src={slide.imageUrl} fill={true} alt={`акция ${index + 1}`} />

            <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-45">
              <div className="p-5 w-[92%] space-y-2 text-white sm:text-center">
                {slide.special_offer && <mark>АКЦИЯ</mark>}
                <Heading type="title" text={slide.name} />
                <Heading type="caption" classes="line-clamp-2" text={slide.description} />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
