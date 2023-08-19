'use client'

import { getVariablesFilter } from '@/helpers/filterHelper'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { ReadonlyURLSearchParams, useParams, useSearchParams } from 'next/navigation'
import React from 'react'

const GET_TOTAL_PRODUCTS = gql`
  query GetTotalProducts($filters: FilterInput!) {
    totalProducts(filters: $filters)
  }
`

const fetchTotalProducts = (category: string, searchParams: ReadonlyURLSearchParams): number => {
  const variables = {
    filters: getVariablesFilter(category, searchParams)
  }

  const { data }: { data: { totalProducts: number } } = useSuspenseQuery(GET_TOTAL_PRODUCTS, { variables, context: { fetchOptions: { cache: 'force-cache' } } })
  return data.totalProducts
}

export const ProductsCount = ({ className }: { className: string }): React.ReactNode => {
  const { category } = useParams()
  const searchParams = useSearchParams()
  const totalProducts = fetchTotalProducts(category as string, searchParams)

  return (
    <p className={className}>{totalProducts} productos</p>
  )
}
