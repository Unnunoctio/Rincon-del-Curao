import { MenuIcon } from '@/icons'

interface Props {
  sideOpen: () => void
}

export const MenuButton: React.FC<Props> = ({ sideOpen }) => {
  return (
    <button
      onClick={sideOpen}
      className='group block md:hidden p-2 h-fit rounded-full'
      aria-label='menu'
    >
      <MenuIcon className='w-7 h-7 fill-transparent transition-colors icon-group-stroke-hover icon-stroke-primary' />
    </button>
  )
}
