import { getVariablesFilter } from '@/helpers/filterHelper'
import { ReadonlyURLSearchParams } from 'next/navigation'

const query = `
  query Query($filters: FilterInput!) {
    totalProducts(filters: $filters)
  }
`
interface Response {
  totalProducts: number
}

export const getTotalProducts = async (category: string, searchParams: ReadonlyURLSearchParams): Promise<number> => {
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
  return data.totalProducts
}
