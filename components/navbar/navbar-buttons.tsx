import { MenuButton } from './menu-button'
import { OptionsButton } from './options-button'

interface Props {
  onClose: () => void
  sideOpen: () => void
}

export const NavbarButtons: React.FC<Props> = ({ onClose, sideOpen }) => {
  return (
    <div className='flex items-center gap-2 ml-0 md:ml-12 h-[71px]'>
      <OptionsButton onClose={onClose} />
      <MenuButton sideOpen={sideOpen} />
    </div>
  )
}
