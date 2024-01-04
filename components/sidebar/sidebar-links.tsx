import { navigateLinks } from '@/helpers/path'
import Link from 'next/link'

interface Props {
  onClose: () => void
}

export const SidebarLinks: React.FC<Props> = ({ onClose }) => {
  return (
    <ul className='flex flex-col gap-6'>
      {navigateLinks.map((link, index) => (
        <li key={index}>
          <h4 className='text-[18px] mb-4 font-medium text-primary'>{link.name}</h4>
          <ul className='flex flex-col gap-4 pl-4 border-l border-primary'>
            {link.categories.map((category, index) => (
              <li key={index}>
                <Link href={`${link.route}?sub_category=${category.query}`} onClick={onClose} className='text-secondary hover:underline'>
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={link.route} onClick={onClose} className='text-active hover:underline'>
                Ver Todos
              </Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
