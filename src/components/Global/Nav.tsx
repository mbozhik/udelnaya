'use client'

import Link from 'next/link'

import {headerData} from '#/Global/Header'

export default function Nav() {
  const navLinks = Object.keys(headerData.nav)

  return (
    <nav className="flex sm:grid sm:grid-cols-4 justify-center border-t-[1.5px] border-b-[1.5px] font-book border-custom-gray/70 ">
      {navLinks.map((key, index) => {
        const linkClasses = {
          default: `py-2 px-5 sm:px-2 
                    sm:text-xs sm:text-center cursor-pointer
                    hover:bg-custom-dirty-white duration-300
                    ${index === navLinks.length - 1 && 'border-r-[1.5px]'}
                    ${index === 4 && 'sm:hidden'}
                    `,
          style: ' border-l-[1.5px] border-custom-gray/70 ',
        }

        const item = headerData.nav[key]
        if (item.type === 'dropdown') {
          return (
            <div className="overflow-hidden group" key={index}>
              <h1 className={`group group-hover:bg-custom-dirty-white ${linkClasses.default} ${linkClasses.style}`}>{item.config.name}</h1>
              <div className="hidden group-hover:block absolute bg-white shadow-md z-10 ml-[1px] peer">
                {item.config.content.map((elem, subIndex) => (
                  <Link href={elem.href} className={`block text-left border-t-[1.5px] sm:!text-left border-custom-gray/40 ${linkClasses.default}`} key={subIndex}>
                    {elem.title}
                  </Link>
                ))}
              </div>
            </div>
          )
        } else if (item.type === 'link') {
          return (
            <Link href={item.config.href} className={`${linkClasses.default} ${linkClasses.style}`} key={index}>
              {item.config.name}
            </Link>
          )
        }
      })}
    </nav>
  )
}
