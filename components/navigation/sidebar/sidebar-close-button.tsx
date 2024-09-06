import { XIcon } from '@/icons'
import { useUIStore } from '@/stores'

export const SidebarCloseButton: React.FC = () => {
  const { closeSidebar } = useUIStore((state) => state)

  return (
    <button
      onClick={closeSidebar}
      className='group sidebar-button-close'
      aria-label='cerrar sidebar'
    >
      <XIcon className='sidebar-button-close-icon' />
    </button>
  )
}
