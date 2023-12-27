import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ThemeSwitch } from '../theme'
import { GearIcon } from '@/icons'

interface Props {
  close: () => void
}

export const OptionsButton: React.FC<Props> = ({ close }) => {
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button
            onClick={close}
            className='group p-2 h-fit rounded-full focus:outline-none'
            aria-label='options'
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
