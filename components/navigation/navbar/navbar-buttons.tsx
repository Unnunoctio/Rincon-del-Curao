import { MenuButton } from './menu-button'
import { OptionsButton } from './options-button'

interface Props {
  onClose: () => void
}

export const NavbarButtons: React.FC<Props> = ({ onClose }) => {
  return (
    <div className='navbar-buttons-container'>
      <OptionsButton onClose={onClose} />
      <MenuButton />
    </div>
  )
}
