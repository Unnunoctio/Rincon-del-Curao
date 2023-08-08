/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const categoryLinks = [
  { name: 'Cervezas', route: '/cervezas' },
  { name: 'Vinos', route: '/vinos' },
  { name: 'Destilados', route: '/destilados' }
]

export const Breadcrumb = (): React.ReactNode => {
  const { category, id } = useParams()

  return (
    <nav aria-label='breadcrumb'>
      <ol className='flex items-center text-secondary'>
        <li>
          <Link href='/' className='hover:underline'>
            Home
          </Link>
          <Separator />
        </li>
        <li>
          {id !== undefined && (
            <>
              <Link href={`/${category}`} className='hover:underline'>
                {categoryLinks.find(link => link.route === `/${category}`)?.name}
              </Link>
              <Separator />
            </>
          )}
          {id === undefined && (
            <p className='text-active select-none'>
              {categoryLinks.find(link => link.route === `/${category}`)?.name}
            </p>
          )}
        </li>
        {id !== undefined && (
          <li className='overflow-hidden'>
            <p className='text-active select-none whitespace-nowrap overflow-hidden text-ellipsis'>{id}</p>
          </li>
        )}
      </ol>
    </nav>
  )
}

const Separator = (): React.ReactNode => {
  return (
    <span className='mx-2 select-none'>/</span>
  )
}
