import { PathLink } from '@/types/path'
import Link from 'next/link'
import React from 'react'
import { Separator } from './separator'

interface Props {
  links: PathLink[]
}

export const Breadcrumb: React.FC<Props> = ({ links }) => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='flex items-center text-secondary'>
        {links.map((link, index) => (
          (index === links.length - 1)
            ? (
              <li key={index} className='overflow-hidden'>
                <p className='text-active whitespace-nowrap overflow-hidden text-ellipsis'>{link.name}</p>
              </li>
              )
            : (
              <li key={index}>
                <Link href={link.route} className='hover:underline'>{link.name}</Link>
                <Separator />
              </li>
              )
        ))}
      </ol>
    </nav>
  )
}
