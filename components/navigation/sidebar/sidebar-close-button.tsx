import { XIcon } from '@/icons'

interface Props {
  sideClose: () => void
}

export const SidebarCloseButton: React.FC<Props> = ({ sideClose }) => {
  return (
    <button
      onClick={sideClose}
      className='group sidebar-button-close'
      aria-label='cerrar sidebar'
    >
      <XIcon className='sidebar-button-close-icon' />
    </button>
  )
}
