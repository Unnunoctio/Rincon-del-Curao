/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getNavigateLink } from '@/helpers/pathsHelper'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'

const GET_PRODUCT_TITLE = gql`
  query GetProductTitle($path: ID!) {
    product(path: $path) {
      title
    }
  }
`

const fetchProductTitle = (path: string): string => {
  const variables = {
    path
  }

  const { data }: { data: { product: { title: string } } } = useSuspenseQuery(GET_PRODUCT_TITLE, { variables, context: { fetchOptions: { cache: 'force-cache' } } })
  return data.product.title
}

export const Breadcrumb = (): React.ReactNode => {
  const { category, path } = useParams()
  const categoryLink = getNavigateLink(`/${category}`)
  const titlePath = path !== undefined ? fetchProductTitle(path as string) : undefined

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
          {path !== undefined && (
            <>
              <Link href={`/${category}`} className='hover:underline'>
                {categoryLink?.name}
              </Link>
              <Separator />
            </>
          )}
          {path === undefined && (
            <p className='text-active select-none'>
              {categoryLink?.name}
            </p>
          )}
        </li>
        {path !== undefined && (
          <li className='overflow-hidden'>
            <p className='text-active select-none whitespace-nowrap overflow-hidden text-ellipsis'>{titlePath}</p>
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
