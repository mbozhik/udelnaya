'use client'

import {useState} from 'react'

import Container from '#/UI/Container'
import Text from '#/UI/Text'
import Button from '#/UI/Button'
import BoockingForm from '#/UI/BookingForm'

import {Input} from '#/UI/Input'

export default function Booking() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible)

  return (
    <>
      <section data-section="booking" className="py-5 bg-custom-light-gray">
        <Container padding={false}>
          <div className="grid items-center grid-cols-4 gap-5 sm:gap-2 sm:grid-cols-1">
            <div className="-space-y-1 sm:mx-auto sm:mb-2">
              <Text type="title" classes="text-lg" text="Бронирование номера" />
              <Text type="caption" classes="font-light sm:hidden" text="Оставьте заявку" />
            </div>

            <Input placeholder="Имя" className="h-[90%]" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="E-mail" className="h-[90%]" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button type="button" onClick={toggleFormVisibility} classes="w-full" size="lg" adavanced_hover={true} text="Заполнить заявку" />
          </div>
        </Container>
      </section>

      {isFormVisible && <BoockingForm closeForm={toggleFormVisibility} pre_name={name} pre_email={email} />}
    </>
  )
}
