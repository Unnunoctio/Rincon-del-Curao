import Link from 'next/link'
import { navigateLinks } from '@/helpers/path'

interface Props {
  isOpen: boolean
  onOpen: () => void
}

export const NavbarLinks: React.FC<Props> = ({ isOpen, onOpen }) => {
  return (
    <ul onMouseEnter={onOpen} className={`hidden md:flex items-start gap-6 overflow-hidden ${isOpen ? 'h-[271px]' : 'h-[71px]'} transition-height duration-300`}>
      {navigateLinks.map((link, index) => (
        <li key={index} className='flex flex-col pb-8'>
          <span className='flex items-center h-[71px] text-[18px] font-medium text-primary select-none'>{link.name}</span>
          <ul className='flex flex-col gap-3'>
            {link.categories.map((category, index) => (
              <li key={index}>
                <Link href={`${link.route}?sub_category=${category.query}`} className='w-fit text-secondary hover:underline'>
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={link.route} className='w-fit text-active hover:underline'>
                Ver Todos
              </Link>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
