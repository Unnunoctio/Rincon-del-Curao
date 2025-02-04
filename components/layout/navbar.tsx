'use client'

import { ThemeSwitch } from '@/components/layout/theme-switch'
import { WebModal } from '@/components/layout/web-modal'
import { Logo } from '@/components/ui/logo'
import { BeerIcon } from '@/icons/layout/beer-icon'
import { DotIcon } from '@/icons/layout/dot-icon'
import { GearIcon } from '@/icons/layout/gear-icon'
import { MenuIcon } from '@/icons/layout/menu-icon'
import { SpiritIcon } from '@/icons/layout/spirit-icon'
import { WineIcon } from '@/icons/layout/wine-icon'
import { useUIStore } from '@/stores/ui-store'
import '@/styles/globals.css'
import { ROUTES } from '@/utils/router-paths'
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'
import { JSX } from 'react'

export const Navbar: React.FC = (): JSX.Element => {
  const { isNavbarOpen, openNavbar, closeNavbar, openSidebar } = useUIStore((state) => state)

  return (
    <header className='n-container' onMouseLeave={closeNavbar}>
      <nav className='navbar'>
        <Logo classNameBoxHeight='n-logo-box-height' classNameLogoWidth='n-logo-width' />
        <div className='n-sections-container'>
          <ul className={`n-routes-container ${isNavbarOpen ? 'n-routes-container-open' : 'n-routes-container-closed'}`} onMouseEnter={openNavbar}>
            {ROUTES.map((item, index) => (
              <li key={index}>
                <div className='n-route-content'>
                  {item.icon === 'beer-icon' && <BeerIcon className='n-route-icon' />}
                  {item.icon === 'wine-icon' && <WineIcon className='n-route-icon' />}
                  {item.icon === 'spirit-icon' && <SpiritIcon className='n-route-icon' />}
                  <span className='n-route-name'>{item.name}</span>
                </div>
                <ul className='n-route-categories-container'>
                  {item.categories.map((category, index) => (
                    <li key={index} className='n-route-category-content'>
                      <DotIcon className='n-route-category-dot' />
                      <Link href={`${item.route}?sub_category=${category.query}`} className='n-route-category'>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li className='n-route-category-content'>
                    <DotIcon className='n-route-category-dot' />
                    <Link href={`${item.route}`} className='n-route-category-all'>
                      Ver Todos
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <section className='n-buttons-container'>
            <Popover className='group'>
              <PopoverButton
                onClick={closeNavbar}
                className='n-popover-button'
                aria-label='Opciones'
              >
                <GearIcon className='n-popover-icon' />
              </PopoverButton>
              <PopoverBackdrop className='n-popover-backdrop' />
              <PopoverPanel
                transition
                anchor='bottom'
                className='n-popover-panel'
              >
                <ThemeSwitch />
                <WebModal />
              </PopoverPanel>
            </Popover>
            <button
              onClick={openSidebar}
              className='group n-sidebar-button'
              aria-label='Abrir/Cerrar Menu'
            >
              <MenuIcon className='n-sidebar-icon' />
            </button>
          </section>
        </div>
      </nav>
    </header>
  )
}
