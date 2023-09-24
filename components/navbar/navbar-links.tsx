import { navigateLinks } from '@/helpers/path-helper'
import { NavbarLink } from './navbar-link'

interface Props {
  isNavOpen: boolean
  navOpen: () => void
}

export const NavbarLinks: React.FC<Props> = ({ isNavOpen, navOpen }) => {
  return (
    <ul
      className={`hidden md:flex items-start gap-6 overflow-hidden ${isNavOpen ? 'h-[271px]' : 'h-[71px]'} transition-height duration-300`}
      onMouseEnter={navOpen}
    >
      {navigateLinks.map((link, index) => (
        <li key={index} className='flex flex-col pb-8'>
          <h4 className='flex items-center h-[71px] text-[18px] font-medium text-primary select-none'>{link.name}</h4>
          <ul className='flex flex-col gap-3'>
            {link.categories.map((category, index) => (
              <NavbarLink key={index} title={category.name} href={`${link.route}?category=${category.query}`} className='w-fit text-secondary hover:underline' />
            ))}
            <NavbarLink title='Ver Todos' href={link.route} className='w-fit text-active hover:underline' />
          </ul>
        </li>
      ))}
    </ul>
  )
}
