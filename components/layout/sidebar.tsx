'use client'

import { BeerIcon } from '@/icons/layout/beer-icon'
import { DotIcon } from '@/icons/layout/dot-icon'
import { SpiritIcon } from '@/icons/layout/spirit-icon'
import { WineIcon } from '@/icons/layout/wine-icon'
import { useUIStore } from '@/stores/ui-store'
import '@/styles/globals.css'
import { ROUTES } from '@/utils/router-paths'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Link from 'next/link'
import { JSX } from 'react'
import { Logo } from '../ui/logo'
import { XIcon } from '@/icons/layout/x-icon'

export const Sidebar: React.FC = (): JSX.Element => {
  const { isSidebarOpen, closeSidebar } = useUIStore((state) => state)

  return (
    <Dialog open={isSidebarOpen} onClose={closeSidebar} className='s-container'>
      <DialogBackdrop transition className='s-backdrop' />
      <div className='sidebar'>
        <DialogPanel transition className='s-panel'>
          <DialogTitle className='s-title-container'>
            <Logo classNameBoxHeight='s-logo-box-height' classNameLogoWidth='s-logo-width' />
            <button
              onClick={closeSidebar}
              className='group s-close-button'
              aria-label='Cerrar Menu'
            >
              <XIcon className='s-close-button-icon' />
            </button>
          </DialogTitle>
          <ul className='s-routes-container'>
            {ROUTES.map((item, index) => (
              <li key={index}>
                <div className='s-route-content'>
                  {item.icon === 'beer-icon' && <BeerIcon className='s-route-icon' />}
                  {item.icon === 'wine-icon' && <WineIcon className='s-route-icon' />}
                  {item.icon === 'spirit-icon' && <SpiritIcon className='s-route-icon' />}
                  <span className='s-route-name'>{item.name}</span>
                </div>
                <ul className='s-route-categories-container'>
                  {item.categories.map((category, index) => (
                    <li key={index} className='s-route-category-content'>
                      <DotIcon className='s-route-category-dot' />
                      <Link href={`${item.route}?sub_category=${category.query}`} className='s-route-category'>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li className='s-route-category-content'>
                    <DotIcon className='s-route-category-dot' />
                    <Link href={`${item.route}`} className='s-route-category-all'>
                      Ver Todos
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
