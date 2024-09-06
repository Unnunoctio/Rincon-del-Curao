import { MenuButton } from './menu-button'
import { OptionsButton } from './options-button'

export const NavbarButtons: React.FC = () => {
  return (
    <div className='navbar-buttons-container'>
      <OptionsButton />
      <MenuButton />
    </div>
  )
}
