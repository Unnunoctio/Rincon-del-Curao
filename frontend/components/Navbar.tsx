'use client'

import { navigateLinks } from '@/helpers/pathsHelper'
import { GearIcon, MenuIcon, MoonIcon, SunIcon, SystemIcon } from '@/icons'
import { Popover, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

export const Navbar = ({ isNavOpen, setIsNavOpen, setIsSideOpen }: { isNavOpen: boolean, setIsNavOpen: (value: boolean) => void, setIsSideOpen: (value: boolean) => void }): React.ReactNode => {
  return (
    <header
      className='fixed z-30 flex justify-center w-full bg-primary border-b divider-primary'
      onMouseLeave={() => setIsNavOpen(false)}
    >
      <nav className='flex justify-between px-2 sm:px-8 md:px-13 max-w-nav-container w-full'>
        <div className='flex items-center h-[71px]'>
          <Link href='/' className='transition-transform scale-95 hover:scale-100 sm:scale-100 sm:hover:scale-105'>
            <Image src='/Logo.png' alt='Logo' width={140} height={44.3} priority />
          </Link>
        </div>

        {/* Items and Buttons */}
        <div className='flex'>
          <NavigateItems isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <NavbarButtons setIsNavOpen={setIsNavOpen} setIsSideOpen={setIsSideOpen} />
        </div>
      </nav>
    </header>
  )
}

const NavigateItems = ({ isNavOpen, setIsNavOpen }: { isNavOpen: boolean, setIsNavOpen: (value: boolean) => void }): React.ReactNode => {
  return (
    <ul
      className={`hidden md:flex items-start gap-6 overflow-hidden ${isNavOpen ? 'h-[271px]' : 'h-[71px]'} transition-height duration-300`}
      onMouseEnter={() => setIsNavOpen(true)}
    >
      {navigateLinks.map((link) => (
        <li key={link.route} className='flex flex-col pb-8'>
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
        </li>
      ))}
    </ul>
  )
}

const NavbarButtons = ({ setIsNavOpen, setIsSideOpen }: { setIsNavOpen: (value: boolean) => void, setIsSideOpen: (value: boolean) => void }): React.ReactNode => {
  return (
    <div className='flex items-center gap-2 ml-0 md:ml-12 h-[71px]'>
      <OptionsButton navClose={() => setIsNavOpen(false)} />
      <button className='group block md:hidden p-2 h-fit rounded-full' onClick={() => setIsSideOpen(true)}>
        <MenuIcon className='w-7 h-7 fill-transparent transition-colors icon-group-stroke-hover icon-stroke-primary' />
      </button>
    </div>
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
          <Popover.Button
            onClick={handleClick}
            className='group p-2 h-fit rounded-full focus:outline-none'
            aria-label='Options'
          >
            <GearIcon className={`w-7 h-7 fill-transparent transition-colors icon-group-stroke-hover ${open ? 'stroke-active' : 'icon-stroke-primary'}`} />
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
        className={`group ${theme === 'light' ? 'bg-page' : 'bg-transparent'} p-1.5 rounded-full hover:bg-page transition-colors`}
        aria-label='Light Mode'
      >
        <SunIcon className={`w-5 h-5 fill-transparent ${theme === 'light' ? 'stroke-active' : 'icon-stroke-primary'} transition-colors`} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`group ${theme === 'system' ? 'bg-page' : 'bg-transparent'} p-1.5 rounded-full hover:bg-page transition-colors`}
        aria-label='System Mode'
      >
        <SystemIcon className={`w-5 h-5 fill-transparent ${theme === 'system' ? 'stroke-active' : 'icon-stroke-primary'} transition-colors`} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`group ${theme === 'dark' ? 'bg-page' : 'bg-transparent'} p-1.5 rounded-full hover:bg-page transition-colors`}
        aria-label='Dark Mode'
      >
        <MoonIcon className={`w-5 h-5 fill-transparent ${theme === 'dark' ? 'stroke-active' : 'icon-stroke-primary'} transition-colors`} />
      </button>
    </div>
  )
}
