'use client'

import {isMobile} from '@bozzhik/is-mobile'

import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Autoplay} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '%%/stylesheets/promo_slider.css'

import Heading from '#/UI/Heading'
import Button from '#/UI/Button'

interface SliderProps {
  sliderData: {
    title: string
    caption: string
    id: number
    description: any
    selection?: boolean
    shadow?: boolean
    imageUrl: string
    mobileImageUrl: string
    slug: {current: string}
  }[]
  className: string
}

const Slider: React.FC<SliderProps> = ({sliderData, className}) => {
  return (
    <Swiper data-section="promo-index" className={className} loop={true} speed={1000} autoplay={{delay: 3000, disableOnInteraction: true}} pagination={{clickable: true}} grabCursor={true} modules={[Pagination, Autoplay]}>
      {sliderData
        .sort((a, b) => a.id - b.id)
        .map((slide, index) => (
          <SwiperSlide className="relative grid place-items-center" key={index}>
            <Image quality={100} priority={true} className="absolute inset-0 block object-cover s-full" width={isMobile ? 450 : 1920} height={isMobile ? 900 : 700} alt={`акция ${index + 1}`} src={isMobile ? slide.mobileImageUrl : slide.imageUrl} />

            <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-10">
              <div className="pl-[7%] sm:pl-0 sm:w-full mt-5 space-y-3 sm:-space-y-1 text-white sm:text-center">
                <div className={`space-y-4 sm:space-y-3 w-[43vw] xl:w-[50vw] sm:mx-5 sm:w-auto  ${slide.selection && 'p-5 bg-custom-gray/40 rounded-md'}`}>
                  <div className="space-y-2 xl:space-y-1">
                    <h1 className={`text-6xl font-medium uppercase xl:text-5xl sm:text-3xl max-w-[20ch] sm:w-full sm:mx-auto ${slide.shadow && 'text-shadow-title'}`}>{slide.title}</h1>
                    <Heading type="caption" className={`text-lg sm:w-full sm:mx-auto xl:text-base uppercase ${slide.shadow && 'text-shadow-text'}`} text={slide.caption} />
                  </div>

                  {slide.description && <Button type="link" className="w-fit sm:mx-auto" href={`/sanatorium/promo/${slide.slug.current}`} text="Узнать детали" size="lg" />}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default Slider
