import { MenuIcon } from '@/icons'

interface Props {
  sideOpen: () => void
}

export const MenuButton: React.FC<Props> = ({ sideOpen }) => {
  return (
    <button
      onClick={sideOpen}
      className='group navbar-menu-button'
      aria-label='menu'
    >
      <MenuIcon className='icon-stroke' />
    </button>
  )
}
