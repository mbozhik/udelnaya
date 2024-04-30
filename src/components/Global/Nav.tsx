'use client'

import {useState} from 'react'
import Link from 'next/link'

import {headerData} from '#/Global/Header'

export default function Nav() {
  const [dropdownIndex, setDropdownIndex] = useState(null)

  const handleMouseEnter = (index) => {
    setDropdownIndex(index)
  }

  const handleMouseLeave = () => {
    setDropdownIndex(null)
  }

  return (
    <nav className="flex sm:grid sm:grid-cols-4 justify-center border-t-[1.5px] border-b-[1.5px] font-book border-custom-gray/70 ">
      {Object.keys(headerData.nav).map((key, index) => {
        const linkClasses = {
          position: 'py-1.5 px-5 sm:px-2 sm:text-xs sm:font-normal sm:text-center cursor-pointer',
          style: 'border-l-[1.5px] border-custom-gray/70 hover:bg-custom-dirty-white duration-300',
        }

        const item = headerData.nav[key]
        if (item.type === 'dropdown') {
          return (
            <div key={index} className={linkClasses.style} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
              <div className={`relative ${linkClasses.position}`}>{item.config.name}</div>
              {dropdownIndex === index && (
                <div className="absolute bg-custom-dirty-white">
                  <ul className="grid gap-3 py-1.5 px-5 sm:px-2 -ml-1.5">
                    {item.config.content.map((subItem, subIndex) => (
                      <li key={subIndex} title={subItem.title}>
                        <Link href={subItem.href}>
                          <h1>{subItem.title}</h1>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        } else if (item.type === 'link') {
          return (
            <div key={index} className={linkClasses.position + linkClasses.style}>
              <Link href={item.config.href}>{item.config.name}</Link>
            </div>
          )
        }
      })}
    </nav>
  )
}
