'use client'

import { generatePagination } from '@/helpers/pagination'
import { SearchParams } from '@/types/types'
import { PaginationNumber } from './pagination-number'
import { useEffect, useState } from 'react'

interface Props {
  currentPage: number
  category: string
  searchParams: SearchParams
  hash: string
}

export const Pagination: React.FC<Props> = ({ currentPage, category, searchParams, hash }) => {
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined)

  useEffect(() => {
    setTotalPages(undefined)
    const fetchTotalPages = async (): Promise<void> => {
      const response = await fetch(`/api/total-pages?category=${category}&options=${JSON.stringify(searchParams)}`)
      const data = await response.json()
      setTotalPages(data)
    }
    void fetchTotalPages()
  }, [hash])

  if (totalPages === undefined || totalPages <= 1) return <></>

  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className='pagination'>
      {pages.map((page: any, index) => (
        <PaginationNumber key={index} page={page} isActive={currentPage === page} />
      ))}
    </div>
  )
}
