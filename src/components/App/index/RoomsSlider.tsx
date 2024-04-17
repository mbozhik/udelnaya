'use client'

import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import '%%/stylesheets/rooms_slider.css'

import Heading from '#/UI/Heading'
import ImageSlider from '#/UI/ImageSlider'
import Button from '#/UI/Button'

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

  const slides = sliderData.map((slide, index) => (
    <SwiperSlide key={index} className="bg-custom-light-gray">
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-10 p-16">
        {slide.imageUrls.length > 1 ? (
          <ImageSlider sliderData={generateSliderData(slide.imageUrls)} enable_autoplay={false} classes="relative w-full h-[50vh] xl:h-full sm:h-[50vh]" />
        ) : (
          slide.imageUrls.map((imageUrl, index) => (
            <div className="relative w-full h-[50vh] xl:h-full sm:h-[50vh]" key={index}>
              <Image className="object-cover" src={imageUrl} fill={true} sizes="25vw" alt={`${slide.name}`} />
            </div>
          ))
        )}

        <div className="flex flex-col gap-5 self-center">
          <Heading type="title" classes="" text={slide.name} />

          <div className="w-fit">
            <PortableText value={slide.specification} />
          </div>

          <Button type="link" size="lg" classes="w-fit px-10" adavanced_hover={true} href={`/rooms/${slide.slug}`} text="Узнать детали" />
        </div>
      </div>
    </SwiperSlide>
  ))

  return (
    <>
      <Swiper data-section="rooms-index" className={classes} slidesPerView={1} loop={true} speed={1000} navigation={true} modules={[Navigation]}>
        {slides}
      </Swiper>
    </>
  )
}

export default RoomsSlider
