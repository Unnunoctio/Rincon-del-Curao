import { GearIcon } from '@/icons'
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ThemeSwitch } from './theme-switch'
import { WebModal } from '@/components/web-modal'

interface Props {
  onClose: () => void
}

export const OptionsButton: React.FC<Props> = ({ onClose }) => {
  return (
    <Popover className='group'>
      <PopoverButton
        onClick={onClose}
        className='group popover-button'
        aria-label='opciones'
      >
        <GearIcon className='icon-stroke popover-icon' />
      </PopoverButton>
      <PopoverBackdrop className='popover-backdrop' />
      <PopoverPanel
        transition
        anchor='bottom'
        className='popover-panel'
      >
        <ThemeSwitch />
        <WebModal />
      </PopoverPanel>
    </Popover>
  )
}
