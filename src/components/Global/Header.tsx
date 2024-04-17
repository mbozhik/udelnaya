'use client'

import {useState} from 'react'

import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '%/logo.svg'

import Button from '#/UI/Button'
import BoockingForm from '#/UI/BookingForm'

export const headerContent = {
  nav: {
    1: {name: 'О санатории', href: '/'},
    2: {name: 'Медицина', href: '/medicine/'},
    3: {name: 'Программы', href: '/programs/'},
    4: {name: 'Номера', href: '/rooms/'},
    5: {name: 'Корпоративным клиентам', href: '/corporate/'},
    6: {name: 'Контакты', href: '/contacts/'},
  },
  contacts: {
    tel: {name: '8 (800) 100-35-45', href: 'tel:+78001003545'},
  },
}

export default function Header() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible)

  return (
    <>
      <header className="fixed inset-0 z-50 flex justify-between w-full px-5 py-2 sm:py-1.5 tracking-tight sm:px-3 h-fit bg-white/90 backdrop-filter backdrop-blur-sm">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image className="object-contain duration-300 s-14 xl:s-12 hover:scale-110" src={LogoImage} alt="Logo" />
          </Link>

          <nav className="text-lg xl:text-base font-book space-x-7 xl:space-x-5 sm:hidden">
            {Object.keys(headerContent.nav).map((key) => {
              const {name, href} = headerContent.nav[key]
              return (
                <Link key={key} href={href} className="duration-200 hover:text-custom-primary">
                  {name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-7">
          <Link className="text-lg duration-200 xl:text-base font-book sm:hidden text-custom-primary hover:text-custom-gray" href={headerContent.contacts.tel.href}>
            {headerContent.contacts.tel.name}
          </Link>

          <Button onClick={toggleFormVisibility} type="button" size="lg" adavanced_hover={true} text="Забронировать" />
        </div>
      </header>

      {isFormVisible && <BoockingForm closeForm={toggleFormVisibility} />}
    </>
  )
}
