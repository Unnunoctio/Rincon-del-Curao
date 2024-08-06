import { MenuButton } from './menu-button'
import { OptionsButton } from './options-button'

interface Props {
  onClose: () => void
  sideOpen: () => void
}

export const NavbarButtons: React.FC<Props> = ({ onClose, sideOpen }) => {
  return (
    <div className='navbar-buttons-container'>
      <OptionsButton onClose={onClose} />
      <MenuButton sideOpen={sideOpen} />
    </div>
  )
}
