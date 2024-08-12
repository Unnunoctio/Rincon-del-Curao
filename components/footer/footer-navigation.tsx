import Link from 'next/link'
import { navigateLinks } from '@/helpers/path'

export const FooterNavigation: React.FC = () => {
  return (
    <div className='footer-container-navigation'>
      <h3 className='footer-text-title'>Navegación</h3>
      <ul className='footer-list-items'>
        {navigateLinks.map((link) => (
          <li key={link.route}>
            <Link href={link.route} aria-label={link.name.toLowerCase()} className='footer-link-item'>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
