'use client'

import { FilterIcon } from '@/icons/filter-icon'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export const ProductListFilterMobile: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = (): void => setIsOpen(true)
  const onClose = (): void => setIsOpen(false)

  return (
    <>
      <button
        onClick={onOpen}
        className='group flex xl:hidden items-center gap-1 pl-1 sm:pl-2 pr-3 rounded-md cursor-pointer text-primary hover:bg-selected transition-colors border border-primary border-hover'
        aria-label='filtrar por'
      >
        <FilterIcon className='w-6 h-6 sm:w-7 sm:h-7 icon-stroke-secondary transition-colors group-hover:stroke-active' />
        Filtrar
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-30' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-[300px]'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom='-translate-x-[300px]'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-300'
                  leaveFrom='translate-x-0'
                  leaveTo='-translate-x-[300px]'
                >
                  <Dialog.Panel className='flex flex-col pointer-events-auto relative w-screen'>
                    <div className='h-[72px]' />
                    <div className='flex h-full flex-col overflow-y-auto bg-primary shadow-xl border-r divider-primary'>
                      <div className='px-3 mt-4'>
                        {children}
                      </div>
                      <div className='flex justify-end px-3 mt-2 pb-10'>
                        <button onClick={onClose} aria-label='cerrar filtros' className='font-medium py-1.5 px-8 rounded-full border border-primary text-secondary hover:bg-selected transition-colors hover:text-active hover:border-active'>
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
