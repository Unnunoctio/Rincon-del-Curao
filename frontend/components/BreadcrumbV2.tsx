import Link from 'next/link'
import { PathLink } from '@/helpers/types'

export const BreadcrumbV2 = ({ links }: { links: PathLink[] }): React.ReactNode => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='flex items-center text-secondary'>
        {links.map((link, index) => (
          (index === links.length - 1)
            ? (
              <li key={index} className='overflow-hidden'>
                <p className='text-active whitespace-nowrap overflow-hidden text-ellipsis'>
                  {link.name}
                </p>
              </li>
              )
            : (
              <li key={index}>
                <Link href={link.route} className='hover:underline'>
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

const Separator = (): React.ReactNode => {
  return (
    <span className='mx-3 select-none'>\</span>
  )
}
