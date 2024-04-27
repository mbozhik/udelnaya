'use client'

import {isMobile} from '@bozzhik/is-mobile'

import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import '%%/stylesheets/rooms_slider.css'

import Heading from '#/UI/Heading'
import ImageSlider from '#/UI/ImageSlider'

interface SliderProps {
  sliderData: {
    name: string
    description: string
    specification: any
    imageUrls: string[]
    slug: string
  }[]
  classes: string
}

const RoomsSlider: React.FC<SliderProps> = ({sliderData, classes}) => {
  const generateSliderData = (images: string[]) => {
    return images.map((imageUrl) => ({
      imageUrl: imageUrl,
    }))
  }

  const imagesStyles = 'relative w-full h-[50vh] sm:max-h-[35vh] rounded-md overflow-hidden'

  const slides = sliderData.map((slide, index) => (
    <SwiperSlide key={index} className="bg-custom-light-gray">
      <div className="grid grid-cols-2 gap-10 px-16 py-10 sm:gap-3 sm:grid-cols-1 xl:p-14 sm:p-3">
        {slide.imageUrls.length > 1 ? (
          <ImageSlider sliderData={generateSliderData(slide.imageUrls)} enable_autoplay={false} classes={imagesStyles} />
        ) : (
          slide.imageUrls.map((imageUrl, index) => (
            <div className={imagesStyles} key={index}>
              <Image className="object-cover" src={imageUrl} fill={true} sizes="25vw" alt={`${slide.name}`} />
            </div>
          ))
        )}

        <div className="flex flex-col self-center gap-5 sm:gap-2">
          <Heading type="subtitle" classes="" text={slide.name} />

          <div className="w-fit xl:text-sm sm:mb-4">
            <PortableText value={slide.specification} />
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))

  return !isMobile ? (
    <Swiper data-section="rooms-index" className={classes} slidesPerView={1} autoplay={{delay: 2000, disableOnInteraction: true}} loop={true} speed={1000} navigation={true} modules={[Navigation, Autoplay]}>
      {slides}
    </Swiper>
  ) : (
    <Swiper data-section="rooms-mobile-index" className={classes} slidesPerView={1} autoplay={{delay: 2000, disableOnInteraction: true}} loop={true} speed={1000} navigation={true} modules={[Navigation, Autoplay]}>
      {slides}
    </Swiper>
  )
}

export default RoomsSlider
