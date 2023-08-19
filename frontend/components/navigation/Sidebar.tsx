import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import { XIcon } from '@/icons'
import { navigateLinks } from '@/helpers/pathsHelper'

export const Sidebar = ({ isSideOpen, setIsSideOpen }: { isSideOpen: boolean, setIsSideOpen: (value: boolean) => void }): React.ReactNode => {
  return (
    <Transition.Root show={isSideOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={setIsSideOpen}>
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
                      <Dialog.Title className='flex items-center justify-between h-[88px]'>
                        <Link href='/' className='transition-transform scale-95 hover:scale-100 sm:scale-100 sm:hover:scale-105' onClick={() => setIsSideOpen(false)}>
                          <Image src='/Logo.png' alt='Logo' width={140} height={44.3} priority />
                        </Link>
                        <button className='group block md:hidden p-2 h-fit rounded-full' onClick={() => setIsSideOpen(false)}>
                          <XIcon className='w-7 h-7 fill-transparent transition-colors icon-group-stroke-hover icon-stroke-primary' />
                        </button>
                      </Dialog.Title>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 pb-10'>
                      <NavigateItems setIsSideOpen={setIsSideOpen} />
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

const NavigateItems = ({ setIsSideOpen }: { setIsSideOpen: (value: boolean) => void }): React.ReactNode => {
  return (
    <ul className='flex flex-col gap-6'>
      {navigateLinks.map((link) => (
        <li key={link.route}>
          <h4 className='text-[18px] mb-4 font-medium text-primary'>
            {link.name}
          </h4>
          <ul className='flex flex-col gap-4 pl-4 text-secondary border-l border-primary'>
            {link.categories.map((category) => (
              <li key={category.query}>
                <Link
                  href={`${link.route}?category=${category.query}`}
                  onClick={() => setIsSideOpen(false)}
                  className='hover:underline'
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li className='text-active'>
              <Link
                href={link.route}
                onClick={() => setIsSideOpen(false)}
                className='hover:underline'
              >
                Ver Todos
              </Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
