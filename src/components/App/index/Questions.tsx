'use client'

import {useState} from 'react'

import Heading from '#/UI/Heading'
import Button from '#/UI/Button'
import BoockingForm from '#/UI/BookingForm'

import {headerContent} from '#/Global/Header'

export default function Questions() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible)

  return (
    <>
      <section data-section="questions-index" className="py-20 my-20 rounded-md sm:py-14 bg-custom-light-gray">
        <div className="flex flex-col items-center gap-7">
          <div className="space-y-2 text-center">
            <Heading type="title" text="У вас остались вопросы?" />
            <Heading type="caption" className="w-[70%] sm:w-[95%] mx-auto" text="Оставьте заявку на сайте и наш менеджер свяжется с вами, либо позвоните прямо сейчас!" />
          </div>

          <div className="flex gap-3 sm:gap-2 sm:flex-col sm:w-[93%]">
            <Button type="link" href={headerContent.contacts.tel.href} className="px-14 sm:!w-full" variant="secondary" size="lg" adavanced_hover={true} text="Позвонить нам" />
            <Button type="button" onClick={toggleFormVisibility} className="px-14 sm:w-full" size="lg" adavanced_hover={true} text="Оставить заявку" />
          </div>
        </div>
      </section>

      {isFormVisible && <BoockingForm closeForm={toggleFormVisibility} />}
    </>
  )
}
