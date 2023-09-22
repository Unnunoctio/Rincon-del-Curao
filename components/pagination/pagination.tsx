// paginacion funcionando
'use client'

import { GetTotalPages } from '@/lib/api/get-total-pages'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { PaginationSlider } from './pagination-slider'
import { getDefaultPage, getPage } from '@/helpers/pagination-helper'

export const Pagination: React.FC = () => {
  const [totalPages, setTotalPages] = useState(-1)

  const router = useRouter()
  const pathname = usePathname()
  const { category } = useParams()
  const searchParams = useSearchParams()

  const [selected, setSelected] = useState(getDefaultPage(searchParams.get('page')))

  const createQuery = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])

  const fetchData = async (): Promise<void> => {
    setTotalPages(await GetTotalPages(category as string, searchParams))
  }

  useEffect(() => {
    void fetchData()
  }, [searchParams])

  // validaciones:
  // page es un valor no válido, se redirecciona a la page 1
  // page < 1, se redirecciona a la page 1
  // page > totalPages, se redirecciona a la ultima page
  // selected value !== page value, se actualiza
  useEffect(() => {
    if (totalPages !== -1) {
      const page = getPage(searchParams.get('page'))
      if (page === undefined || page < 1) {
        router.replace(pathname + '?' + createQuery('page', '1'))
      } else if (page > totalPages) {
        router.replace(pathname + '?' + createQuery('page', totalPages.toString()))
      } else if (selected !== page) {
        setSelected(page)
      }
    }
  }, [searchParams])

  const handlePage = (page: number): void => {
    if (page !== selected) {
      setSelected(page)
      router.push(pathname + '?' + createQuery('page', page.toString()))
    }
  }

  if (totalPages === -1) return <></>

  return (
    <div className={`${totalPages > 1 ? 'flex' : 'hidden'} justify-center w-full`}>
      <PaginationSlider totalPages={totalPages}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
          <button
            key={index}
            onClick={() => handlePage(page)}
            className={`snap-always snap-start min-w-[38px] h-[38px] font-bold rounded-md border transition-colors ${page === selected ? 'text-contrast bg-active/75 border-transparent' : 'text-secondary text-hover border-primary border-hover'}`}
            aria-label={`page ${page}`}
          >
            {page}
          </button>
        ))}
      </PaginationSlider>
    </div>
  )
}
