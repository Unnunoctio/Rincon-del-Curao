'use client'

import { getVariablesFilter } from '@/helpers/filterHelper'
import { getDefaultPage, getPage } from '@/helpers/paginatorHelper'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { ReadonlyURLSearchParams, useParams, useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const GET_TOTAL_PAGES = gql`
  query GetTotalPages($filters: FilterInput!) {
    totalPages(filters: $filters)
  }
`

const fetchTotalPages = (category: string, searchParams: ReadonlyURLSearchParams): number => {
  const variables = {
    filters: getVariablesFilter(category, searchParams)
  }

  const { data }: { data: { totalPages: number } } = useSuspenseQuery(GET_TOTAL_PAGES, { variables, context: { fetchOptions: { cache: 'force-cache' } } })
  return data.totalPages
}

export const Paginator = (): React.ReactNode => {
  const router = useRouter()
  const pathname = usePathname()
  const { category } = useParams()
  const searchParams = useSearchParams()
  const totalPages = fetchTotalPages(category as string, searchParams)
  const [selected, setSelected] = useState(getDefaultPage(searchParams.get('page')))

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
  }, [searchParams])

  // validaciones:
  // page es un valor no válido, se redirecciona a la page 1
  // page < 1, se redirecciona a la page 1
  // page > totalPages, se redirecciona a la ultima page
  // selected value !== page value, se actualiza
  useEffect(() => {
    const pageUrl = getPage(searchParams.get('page'))
    if (pageUrl === undefined || pageUrl < 1) {
      router.replace(pathname + '?' + createQueryString('page', '1'))
    } else if (pageUrl > totalPages) {
      router.replace(pathname + '?' + createQueryString('page', totalPages.toString()))
    } else {
      if (pageUrl !== selected) {
        setSelected(pageUrl)
      }
    }
  }, [searchParams, totalPages])

  return (
    <div className='w-full bg-red-500'>Paginator: {totalPages}, Page Actual: {selected}</div>
  )
}
