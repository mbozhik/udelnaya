'use client'

import {useState} from 'react'

import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '%/logo.svg'

import Text from '#/UI/Text'
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

  const keys = Object.keys(headerContent.nav)

  return (
    <>
      <header className="fixed inset-0 z-50 w-full flex flex-col tracking-tight bg-white h-fit backdrop-filter backdrop-blur-[2px] shadow-nav sm:shadow-nav_mobile">
        <section className="flex justify-between w-full p-5 sm:px-3 sm:py-2">
          <div className="flex items-center gap-5">
            <Link href="/">
              <Image className="object-contain duration-300 s-14 xl:s-12 hover:scale-110" src={LogoImage} alt="Logo" />
            </Link>

            <div className="sm:hidden">
              <Text type="title" text="Санаторий «Удельная»" className="text-xl xl:text-lg" />
              <Text text="Медицинский центр, реабилитация, оздоровительные программы в Подмосковье" className="text-base xl:text-sm leading-[1.15] xl:leading-none" />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <Link className="text-lg duration-200 xl:text-base font-book sm:hidden text-custom-primary hover:text-custom-gray" href={headerContent.contacts.tel.href}>
              {headerContent.contacts.tel.name}
            </Link>

            <Button onClick={toggleFormVisibility} type="button" size="lg" adavanced_hover={true} text="Забронировать" />
          </div>
        </section>

        <nav className="flex sm:grid sm:grid-cols-4 justify-center border-t-[1.5px] border-b-[1.5px] font-book border-custom-gray/70 ">
          {keys.map((key, index) => {
            const linkclassName = `py-1.5 px-5 sm:px-2 sm:text-xs sm:font-normal sm:text-center
                        border-l-[1.5px] border-custom-gray/70 
                        hover:bg-custom-gray/15 duration-300 
                        ${index === keys.length - 1 && 'border-r-[1.5px]'} 
                        ${index === 4 && 'xl:hidden'} 
                        ${index === 5 && 'sm:hidden'} `

            const {name, href} = headerContent.nav[key]
            return (
              <Link key={key} href={href} className={linkclassName}>
                {name}
              </Link>
            )
          })}
        </nav>
      </header>

      {isFormVisible && <BoockingForm closeForm={toggleFormVisibility} />}
    </>
  )
}
