import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SidebarLogo } from '../logo'
import { CloseButton } from './close-button'
import { SidebarLinks } from './sidebar-links'

interface Props {
  isSideOpen: boolean
  sideClose: () => void
}

export const Sidebar: React.FC<Props> = ({ isSideOpen, sideClose }) => {
  return (
    <Transition.Root show={isSideOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={sideClose}>
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
                <Dialog.Panel className='pointer-events-auto relative w-screen'>
                  <div className='flex h-full flex-col overflow-y-auto bg-primary shadow-xl border-r divider-primary'>
                    <div className='px-4'>
                      <Dialog.Title className='flex items-center justify-between'>
                        <div className='flex items-center h-[88px]'>
                          <SidebarLogo width={140} height={44.3} sideClose={sideClose} className='transition-transform scale-95 hover:scale-100 sm:scale-100 sm:hover:scale-105' />
                        </div>
                        <CloseButton sideClose={sideClose} />
                      </Dialog.Title>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 pb-10'>
                      <SidebarLinks sideClose={sideClose} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
