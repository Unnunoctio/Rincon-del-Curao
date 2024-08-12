import { Logo } from '@/components/logo'
import { NavbarLinks } from './navbar-links'
import { NavbarButtons } from './navbar-buttons'

interface Props {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  sideOpen: () => void
}

export const Navbar: React.FC<Props> = ({ isOpen, onOpen, onClose, sideOpen }): JSX.Element => {
  return (
    <header
      className='navbar'
      onMouseLeave={onClose}
    >
      <nav className='navbar-container'>
        <Logo boxHeight='h-[63px]' logoWidth='w-[140px]' linkClass='transition-transform scale-[0.97] hover:scale-100 sm:scale-100 sm:hover:scale-[1.03]' />

        <div className='navbar-container-items'>
          <NavbarLinks isOpen={isOpen} onOpen={onOpen} />
          <NavbarButtons onClose={onClose} sideOpen={sideOpen} />
        </div>
      </nav>
    </header>
  )
}
