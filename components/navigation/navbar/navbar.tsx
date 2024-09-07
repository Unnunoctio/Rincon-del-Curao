import { Logo } from '@/components/logo'
import { NavbarLinks } from './navbar-links'
import { NavbarButtons } from './navbar-buttons'
import { useUIStore } from '@/stores'

export const Navbar: React.FC = (): JSX.Element => {
  const { closeNavbar } = useUIStore((state) => state)

  return (
    <header
      className='navbar'
      onMouseLeave={closeNavbar}
    >
      <nav className='navbar-container'>
        <Logo boxHeight='h-[63px]' logoWidth='w-[140px]' linkClass='transition-transform scale-[0.97] hover:scale-100 sm:scale-100 sm:hover:scale-[1.03]' />

        <div className='navbar-container-items'>
          <NavbarLinks />
          <NavbarButtons />
        </div>
      </nav>
    </header>
  )
}
