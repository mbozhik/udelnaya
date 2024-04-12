import Link from 'next/link'

import Image from 'next/image'
import LogoImage from '%/logo.png'

import Button from '#/UI/Button'

const headerContent = {
  nav: {
    1: {name: 'Санаторий', href: '/'},
    2: {name: 'Медицина', href: '/medicine/'},
    3: {name: 'Программы', href: '/programs/'},
    4: {name: 'Номера', href: '/rooms/'},
    5: {name: 'ОМС Реабилитация', href: '/oms/'},
    6: {name: 'Корпоративным клиентам', href: '/corporate/'},
    7: {name: 'Контакты', href: '/contacts/'},
  },
  contacts: {
    tel: {name: '8 (800) 100-35-45', href: 'tel:+78001003545'},
  },
}

export default function Header() {
  return (
    <header className="absolute inset-0 flex justify-between w-full px-5 py-3 h-fit bg-neutral-200/70">
      <div className="flex items-center gap-7">
        <Image className="object-contain s-14" src={LogoImage} alt="Logo" />

        <nav className="text-lg space-x-7">
          {Object.keys(headerContent.nav).map((key) => {
            const {name, href} = headerContent.nav[key]
            return (
              <Link key={key} href={href} className="duration-200 hover:text-custom-teal">
                {name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-7">
        <Link className="text-xl duration-200 text-custom-teal hover:text-custom-gray" href={headerContent.contacts.tel.href}>
          {headerContent.contacts.tel.name}
        </Link>
        <Button href="/" text="Забронировать" />
      </div>
    </header>
  )
}
