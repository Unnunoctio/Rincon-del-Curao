import { Logo } from '../../logo/logo'
import { NavbarButtons } from './navbar-buttons'
import { NavbarLinks } from './navbar-links'

interface Props {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  sideOpen: () => void
}

export const Navbar: React.FC<Props> = ({ isOpen, onOpen, onClose, sideOpen }): JSX.Element => {
  return (
    <header
      className='fixed z-30 flex justify-center w-full bg-primary border-b divider-primary'
      onMouseLeave={onClose}
    >
      <nav className='flex justify-between px-2 sm:px-8 md:px-13 max-w-nav-container w-full'>
        <Logo boxHeight='h-[71px]' logoWidth='w-[140px]' linkClass='transition-transform scale-[0.97] hover:scale-100 sm:scale-100 sm:hover:scale-[1.03]' />

        {/* Items and Buttons */}
        <div className='flex'>
          <NavbarLinks isOpen={isOpen} onOpen={onOpen} />
          <NavbarButtons onClose={onClose} sideOpen={sideOpen} />
        </div>
      </nav>
    </header>
  )
}
