import { Logo } from '../logo/logo'
import { NavbarButtons } from './navbar-buttons'
import { NavbarLinks } from './navbar-links'

interface Props {
  isNavOpen: boolean
  navOpen: () => void
  navClose: () => void
  sideOpen: () => void
}

export const Navbar: React.FC<Props> = ({ isNavOpen, navOpen, navClose, sideOpen }) => {
  return (
    <header
      className='fixed z-30 flex justify-center w-full bg-primary border-b divider-primary'
      onMouseLeave={navClose}
    >
      <nav className='flex justify-between px-2 sm:px-8 md:px-13 max-w-nav-container w-full'>
        <Logo width={140} height={44.3} boxHeight={71} className='transition-transform scale-95 hover:scale-100 sm:scale-100 sm:hover:scale-105' />

        {/* Items and Buttons */}
        <div className='flex'>
          <NavbarLinks isNavOpen={isNavOpen} navOpen={navOpen} />
          <NavbarButtons navClose={navClose} sideOpen={sideOpen} />
        </div>
      </nav>
    </header>
  )
}
