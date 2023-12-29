import { XIcon } from '@/icons'

interface Props {
  sideClose: () => void
}

export const SidebarCloseButton: React.FC<Props> = ({ sideClose }) => {
  return (
    <button
      onClick={sideClose}
      className='group block md:hidden p-2 h-fit rounded-full'
      aria-label='close sidebar'
    >
      <XIcon className='w-7 h-7 fill-transparent transition-colors icon-group-stroke-hover icon-stroke-primary' />
    </button>
  )
}
