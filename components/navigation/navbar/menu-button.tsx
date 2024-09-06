import { MenuIcon } from '@/icons'
import { useUIStore } from '@/stores'

export const MenuButton: React.FC = () => {
  const { openSidebar } = useUIStore((state) => state)

  return (
    <button
      onClick={openSidebar}
      className='group navbar-menu-button'
      aria-label='menu'
    >
      <MenuIcon className='icon-stroke' />
    </button>
  )
}
