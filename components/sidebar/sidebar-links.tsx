import { navigateLinks } from '@/helpers/pathHelper'
import { SidebarLink } from './sidebar-link'

interface Props {
  sideClose: () => void
}

export const SidebarLinks: React.FC<Props> = ({ sideClose }) => {
  return (
    <ul className='flex flex-col gap-6'>
      {navigateLinks.map((link, index) => (
        <li key={index}>
          <h4 className='text-[18px] mb-4 font-medium text-primary'>
            {link.name}
          </h4>
          <ul className='flex flex-col gap-4 pl-4 border-l border-primary'>
            {link.categories.map((category, index) => (
              <SidebarLink key={index} title={category.name} href={`${link.route}?category=${category.query}`} className='text-secondary hover:underline' sideClose={sideClose} />
            ))}
            <SidebarLink key={index} title='Ver Todos' href={link.route} className='text-active hover:underline' sideClose={sideClose} />
          </ul>
        </li>
      ))}
    </ul>
  )
}
