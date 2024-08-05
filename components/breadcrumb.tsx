import Link from 'next/link'
import { PathLink } from '@/types/path'

interface Props {
  links: PathLink[]
}

export const Breadcrumb: React.FC<Props> = ({ links = [] }) => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb-list'>
        {links.map((link, index) => (
          (index === links.length - 1)
            ? (
              <li key={index} className='breadcrumb-item-active'>
                {link.name}
              </li>
              )
            : (
              <li key={index}>
                <Link href={link.route} aria-label={link.name.toLowerCase()} className='breadcrumb-item'>
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

const Separator: React.FC = () => {
  return (
    <span className='breadcrumb-separator'>\</span>
  )
}
