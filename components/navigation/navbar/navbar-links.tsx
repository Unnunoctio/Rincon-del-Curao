import Link from 'next/link'
import { navigateLinks } from '@/helpers/path'
import { CategoryQuery } from '@/types/path'
import { useUIStore } from '@/stores'

export const NavbarLinks: React.FC = () => {
  const { isNavbarOpen, openNavbar } = useUIStore((state) => state)

  return (
    <ul onMouseEnter={openNavbar} className={`navbar-link-list ${isNavbarOpen ? 'navbar-link-list-open' : ''}`}>
      {navigateLinks.map((link, index) => (
        <NavbarLinkItem key={index} {...link} />
      ))}
    </ul>
  )
}

interface PropsItem {
  name: string
  route: string
  categories: CategoryQuery[]
}

const NavbarLinkItem: React.FC<PropsItem> = ({ name, route, categories }) => {
  return (
    <li>
      <span className='navbar-link-title'>{name}</span>
      <ul className='navbar-category-list'>
        {categories.map((category, index) => (
          <li key={index}>
            <Link href={`${route}?sub_category=${category.query}`} aria-label={category.name.toLowerCase()} className='navbar-category'>
              {category.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href={route} aria-label='ver todos' className='navbar-category-all'>
            Ver Todos
          </Link>
        </li>
      </ul>
    </li>
  )
}
