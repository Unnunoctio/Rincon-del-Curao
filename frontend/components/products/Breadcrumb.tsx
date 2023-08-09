/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getNavigateLink } from '@/helpers/pathsHelper'

export const Breadcrumb = (): React.ReactNode => {
  const { category, id } = useParams()
  const categoryLink = getNavigateLink(`/${category}`)

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
                {categoryLink?.name}
              </Link>
              <Separator />
            </>
          )}
          {id === undefined && (
            <p className='text-active select-none'>
              {categoryLink?.name}
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
