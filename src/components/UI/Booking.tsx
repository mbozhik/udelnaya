'use client'

import Container from '#/UI/Container'
import Text from '#/UI/Text'

import Button from '#/UI/Button'
import {Input} from '#/UI/Input'

function handleBookingClick() {
  alert('Booking button clicked')
}

export default function Booking() {
  return (
    <section data-section="booking" className="py-5 bg-custom-light-gray">
      <Container padding={false}>
        <form className="grid items-center grid-cols-4 gap-5 sm:gap-2 sm:grid-cols-1">
          <div className="-space-y-1 sm:mx-auto sm:mb-2">
            <Text type="title" classes="xl:text-lg" text="Бронирование номера" />
            <Text type="caption" classes="font-light sm:hidden" text="Оставьте заявку" />
          </div>

          <Input placeholder="Имя" className="h-[90%]" />
          <Input placeholder="E-mail" className="h-[90%]" />
          <Button type="button" onClick={handleBookingClick} classes="w-full" size="lg" text="Заполнить заявку" />
        </form>
      </Container>
    </section>
  )
}
