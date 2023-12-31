/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { generatePagination } from '@/helpers/pagination'
import { PaginationNumber } from './pagination-number'
import { PaginationArrow } from './paginarion-arrow'

interface Props {
  totalPages: number
}

export const Pagination: React.FC<Props> = ({ totalPages }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const allPages = generatePagination(currentPage, totalPages)

  const createPageURL = (page: string | number): string => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <div className='flex w-full justify-center gap-1 xs:gap-2'>
      <PaginationArrow direction='left' href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />
      {allPages.map((page: any) => (
        <PaginationNumber key={page} href={createPageURL(page)} page={page} isActive={currentPage === page} />
      ))}
      <PaginationArrow direction='right' href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
    </div>
  )
}
