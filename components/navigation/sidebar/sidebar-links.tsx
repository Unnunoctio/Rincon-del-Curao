import { navigateLinks } from '@/helpers/path'
import { useUIStore } from '@/stores'
import Link from 'next/link'

export const SidebarLinks: React.FC = () => {
  const { closeSidebar } = useUIStore((state) => state)

  return (
    <ul className='sidebar-link-list'>
      {navigateLinks.map((link, index) => (
        <li key={index}>
          <h4 className='sidebar-link-title'>{link.name}</h4>
          <ul className='sidebar-category-list'>
            {link.categories.map((category, index) => (
              <li key={index}>
                <Link href={`${link.route}?sub_category=${category.query}`} onClick={closeSidebar} aria-label={category.name.toLowerCase()} className='sidebar-category'>
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={link.route} onClick={closeSidebar} aria-label='ver todos' className='sidebar-category-all'>
                Ver Todos
              </Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
