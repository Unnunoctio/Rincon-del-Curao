'use client'

import { getVariablesFilter } from '@/helpers/filterHelper'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useParams, useSearchParams } from 'next/navigation'

const query = gql`
  query Query($filters: FilterInput!) {
    totalProducts(filters: $filters)
  }
`
interface Response {
  totalProducts: number
}

export const ProductsCount = ({ className }: { className: string }): React.ReactNode => {
  const { category } = useParams()
  const searchParams = useSearchParams()
  const { data } = useSuspenseQuery<Response>(query, { variables: { filters: getVariablesFilter(category as string, searchParams) } })

  return (
    <p className={className}>{data.totalProducts} productos</p>
  )
}
