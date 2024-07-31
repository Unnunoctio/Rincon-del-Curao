import Link from 'next/link'
import { PathLink } from '@/types/path'
import { Separator } from './separator'

interface Props {
  links: PathLink[]
}

export const Breadcrumb: React.FC<Props> = ({ links = [] }) => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='flex items-center text-secondary'>
        {links.map((link, index) => (
          (index === links.length - 1)
            ? (
              <li key={index} className='truncate text-active'>
                {link.name}
              </li>
              )
            : (
              <li key={index}>
                <Link href={link.route} aria-label={link.name.toLowerCase()} className='hover:underline'>
                  {link.name}
                </Link>
                <Separator />
              </li>
              )
        ))}
      </ol>
    </nav>
  )
}
