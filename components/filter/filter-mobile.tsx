'use client'

import { FilterIcon } from '@/icons/filter-icon'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

export const FilterMobile: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = (): void => setIsOpen(true)
  const onClose = (): void => setIsOpen(false)

  return (
    <>
      <button
        onClick={onOpen}
        className='group filter-mobile-button'
        aria-label='filtrar por'
      >
        <FilterIcon className='filter-mobile-button-icon' />
        Filtrar
      </button>
      <Dialog open={isOpen} onClose={onClose} className='filter-mobile-sidebar'>
        <DialogBackdrop transition className='sidebar-backdrop' />
        <div className='sidebar-container'>
          <div className='sidebar-container-absolute'>
            <div className='sidebar-container-width'>
              <DialogPanel transition className='sidebar-panel'>
                <div className='sidebar-items'>
                  <div className='filter-mobile-sidebar-items-space'>
                    {children}
                  </div>
                  <div className='filter-mobile-sidebar-button-container'>
                    <button onClick={onClose} aria-label='cerrar filtros' className='filter-mobile-sidebar-button'>
                      Cerrar
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
