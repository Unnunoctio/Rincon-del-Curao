'use client'

import { GearIcon, MoonIcon, SunIcon } from '@/icons'
import { Popover, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'

const links = [
  {
    name: 'Cervezas',
    route: '/cervezas',
    categories: [
      { name: 'Cervezas Artesanales', query: 'Cervezas Artesanales' },
      { name: 'Cervezas Tradicionales', query: 'Cervezas Tradicionales' },
      { name: 'Cervezas Importadas', query: 'Cervezas Importadas' },
      { name: 'Cervezas Sin Alcohol', query: 'Cervezas Sin Alcohol' }
    ]
  },
  {
    name: 'Vinos',
    route: '/vinos',
    categories: [
      { name: 'Vinos Tintos', query: 'Vinos Tintos' },
      { name: 'Vinos Blancos', query: 'Vinos Blancos' },
      { name: 'Vinos Rosé', query: 'Vinos Rose' },
      { name: 'Vinos Cero', query: 'Vinos Cero' }
    ]
  },
  {
    name: 'Destilados',
    route: '/destilados',
    categories: [
      { name: 'Ron', query: 'Ron' },
      { name: 'Pisco', query: 'Pisco' },
      { name: 'Vodka', query: 'Vodka' },
      { name: 'Whisky', query: 'Whisky' }
    ]
  }
]

export const Navigation = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header
      className='fixed z-30 flex justify-center w-full bg-primary border-b divider-primary'
      onMouseLeave={() => setIsOpen(false)}
    >
      <nav className='flex justify-between px-2 sm:px-4 md:px-8 max-w-nav-container w-full'>
        <div className='flex items-center h-[71px]'>
          <Link href='/' className='transition-transform hover:scale-105'>
            <Image src='/Logo.png' alt='Logo' width={140} height={44.3} priority />
          </Link>
        </div>

        {/* Items and Buttons */}
        <div className='flex'>
          <ul
            className={`flex items-start gap-6 overflow-hidden ${isOpen ? 'h-[271px]' : 'h-[71px]'} transition-height duration-300`}
            onMouseEnter={() => setIsOpen(true)}
          >
            {links.map((link) => (
              <li key={link.route}>
                <div className='flex flex-col pb-8'>
                  <h4 className='flex items-center h-[71px] text-[18px] font-medium text-primary select-none'>
                    {link.name}
                  </h4>
                  <div className='flex flex-col gap-3'>
                    {link.categories.map((category) => (
                      <Link
                        key={category.query}
                        href={`${link.route}?category=${category.query}`}
                        className='w-fit text-secondary hover:underline'
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link href={link.route} className='w-fit text-active hover:underline'>
                      Ver Todos
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Options Button */}
          <div className='flex items-center ml-12 h-[71px]'>
            <OptionsButton navClose={() => setIsOpen(false)} />
            {/* <Example /> */}
          </div>
        </div>
      </nav>
    </header>
  )
}

const OptionsButton = ({ navClose }: { navClose: Function }): React.ReactNode => {
  const handleClick = (): void => {
    navClose()
  }

  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button onClick={handleClick} className='group p-2 h-fit rounded-full focus:outline-none'>
            <GearIcon className='w-7 h-7 fill-transparent icon-stroke-primary transition-colors group-hover:icon-stroke-hover' />
          </Popover.Button>
          <Popover.Overlay className='fixed inset-0' />
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-1/2 z-10 -translate-x-1/2 transform mt-1 px-4 sm:px-0'>
              <div className='overflow-hidden py-3 px-3 bg-primary rounded-lg border divider-primary shadow-lg'>
                <ThemeSwitch />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

const ThemeSwitch = (): React.ReactNode => {
  const { theme, setTheme } = useTheme()
  return (
    <div className='flex items-center gap-1 p-1 rounded-full border divider-primary'>
      <button
        onClick={() => setTheme('light')}
        className={`group ${theme === 'dark' ? 'bg-transparent' : 'bg-page'} p-1.5 rounded-full hover:bg-page transition-colors`}
      >
        <SunIcon className={`w-5 h-5 fill-transparent group-hover:icon-stroke-hover ${theme === 'dark' ? 'icon-stroke-primary' : 'icon-stroke-hover'} transition-colors`} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`group ${theme === 'dark' ? 'bg-page' : 'bg-transparent'} p-1.5 rounded-full hover:bg-page transition-colors`}
      >
        <MoonIcon className={`w-5 h-5 fill-transparent group-hover:icon-stroke-hover ${theme === 'dark' ? 'icon-stroke-hover' : 'icon-stroke-primary'} transition-colors`} />
      </button>
    </div>
  )
}
