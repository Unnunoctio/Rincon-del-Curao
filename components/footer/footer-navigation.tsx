import Link from 'next/link'
import { navigateLinks } from '@/helpers/pathHelper'

export const FooterNavigation: React.FC = () => {
  return (
    <div className='hidden md:block'>
      <h5 className='text-[18px] font-medium text-primary'>Navegación</h5>
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
