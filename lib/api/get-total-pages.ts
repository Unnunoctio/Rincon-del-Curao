import { getVariablesFilter } from '@/helpers/filter-helper'
import { ReadonlyURLSearchParams } from 'next/navigation'

const query = `
  query Query($filters: FilterInput!) {
    totalPages(filters: $filters)
  }
`
interface Response {
  totalPages: number
}

export const GetTotalPages = async (category: string, searchParams: ReadonlyURLSearchParams): Promise<number> => {
  const variables = {
    filters: getVariablesFilter(category, searchParams)
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
    body: JSON.stringify({
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.totalPages
}
