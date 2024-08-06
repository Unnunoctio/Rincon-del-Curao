import { navigateLinks } from '@/helpers/path'
import Link from 'next/link'

interface Props {
  onClose: () => void
}

export const SidebarLinks: React.FC<Props> = ({ onClose }) => {
  return (
    <ul className='sidebar-link-list'>
      {navigateLinks.map((link, index) => (
        <li key={index}>
          <h4 className='sidebar-link-title'>{link.name}</h4>
          <ul className='sidebar-category-list'>
            {link.categories.map((category, index) => (
              <li key={index}>
                <Link href={`${link.route}?sub_category=${category.query}`} onClick={onClose} aria-label={category.name.toLowerCase()} className='sidebar-category'>
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={link.route} onClick={onClose} aria-label='ver todos' className='sidebar-category-all'>
                Ver Todos
              </Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
