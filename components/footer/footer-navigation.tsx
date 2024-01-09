import { navigateLinks } from '@/helpers/path'
import Link from 'next/link'

export const FooterNavigation: React.FC = () => {
  return (
    <div className='hidden md:block'>
      <h3 className='text-[18px] font-medium text-primary'>Navegación</h3>
      <ul className='flex flex-col gap-3 mt-3'>
        {navigateLinks.map((link) => (
          <li key={link.route}>
            <Link href={link.route} className='w-fit text-secondary hover:underline'>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
