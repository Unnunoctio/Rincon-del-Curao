import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { SidebarLogo } from '../logo'
import { SidebarCloseButton } from './sidebar-close-button'
import { SidebarLinks } from './sidebar-links'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={onClose}>
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
                        <SidebarLogo boxHeight='h-[88px]' logoWidth='w-[140px]' sideClose={onClose} linkClass='transition-transform scale-[0.97] hover:scale-100 sm:scale-100 sm:hover:scale-[1.03]' />
                        <SidebarCloseButton sideClose={onClose} />
                      </Dialog.Title>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 pb-10'>
                      <SidebarLinks onClose={onClose} />
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
