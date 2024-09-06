'use client'

import { FilterIcon } from '@/icons/filter-icon'
import { useUIStore } from '@/stores'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

interface Props {
  children: React.ReactNode
}

export const FilterMobile: React.FC<Props> = ({ children }) => {
  const { isFilterSidebarOpen, openFilterSidebar, closeFilterSidebar } = useUIStore((state) => state)

  return (
    <>
      <button
        onClick={openFilterSidebar}
        className='group filter-mobile-button'
        aria-label='filtrar por'
      >
        <FilterIcon className='filter-mobile-button-icon' />
        Filtrar
      </button>
      <Dialog open={isFilterSidebarOpen} onClose={closeFilterSidebar} className='filter-mobile-sidebar'>
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
                    <button onClick={closeFilterSidebar} aria-label='cerrar filtros' className='filter-mobile-sidebar-button'>
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
