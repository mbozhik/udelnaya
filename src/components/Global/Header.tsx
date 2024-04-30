'use client'

import {useState} from 'react'

import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '%/logo.svg'

import Text from '#/UI/Text'
import Button from '#/UI/Button'
import BoockingForm from '#/UI/BookingForm'
import Nav from '#/Global/Nav'

export const headerData = {
  nav: {
    1: {
      type: 'dropdown',
      config: {
        name: 'Санаторий',
        content: [
          {
            title: 'О Санатории',
            href: '/sanatorium/about',
          },
          {
            title: 'Новости',
            href: '/sanatorium/news',
          },
          {
            title: 'Важная информация',
            href: '/sanatorium/info',
          },
        ],
      },
    },
    2: {
      type: 'dropdown',
      config: {
        name: 'Медицина',
        content: [
          {
            title: 'Специалисты',
            href: '/medicine/specialisty',
          },
          {
            title: 'Диагностика',
            href: '/medicine/diagnostika',
          },
          {
            title: 'Процедуры',
            href: '/medicine/procedury',
          },
          {
            title: 'ОМС Реабилитация',
            href: '/medicine/oms-reabilitaciya',
          },
        ],
      },
    },
    3: {
      type: 'dropdown',
      config: {
        name: 'Программы',
        content: [
          {
            title: 'Базовые',
            href: '/programs/categories/bazovye',
          },
          {
            title: 'Оздоровительные',
            href: '/programs/categories/ozdorovitelnye',
          },
          {
            title: 'Лечебно-реабилитационные',
            href: '/programs/categories/lechebno-reabilitacionnye',
          },
        ],
      },
    },
    4: {
      type: 'link',
      config: {
        name: 'Номера',
        href: '/#rooms',
      },
    },
    5: {
      type: 'link',
      config: {
        name: 'Контакты',
        href: '#',
      },
    },
  },
  tel: {name: '8 (800) 100-35-45', href: 'tel:+78001003545'},
}

export default function Header() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible)

  return (
    <>
      <header className="fixed inset-0 z-50 w-full flex flex-col tracking-tight bg-white h-fit backdrop-filter backdrop-blur-[2px] shadow-nav sm:shadow-nav_mobile">
        <section className="flex justify-between w-full p-5 sm:px-3 sm:py-2">
          <div className="flex items-center gap-5">
            <Link href="/">
              <Image className="object-contain duration-300 s-14 xl:s-12 hover:scale-110" src={LogoImage} alt="Logo" />
            </Link>

            <div className="sm:hidden">
              <Text type="title" className="" text="Санаторий «Удельная»" />
              <Text className="text-lg leading-[1.20]" text="Медицинский центр, реабилитация, оздоровительные программы в Подмосковье" />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <Link className="text-lg duration-200 xl:text-base font-book sm:hidden text-custom-primary hover:text-custom-gray" href={headerData.tel.href}>
              {headerData.tel.name}
            </Link>

            <Button onClick={toggleFormVisibility} type="button" size="lg" adavanced_hover={true} text="Забронировать" />
          </div>
        </section>

        <Nav />
      </header>

      {isFormVisible && <BoockingForm closeForm={toggleFormVisibility} />}
    </>
  )
}
