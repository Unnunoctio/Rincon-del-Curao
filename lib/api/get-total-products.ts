import { FilterOptions } from '@/types/types'

const query = `
  query Query($availableWebs: [String]!, $category: Category!, $options: OptionsInput!) {
    totalProducts(availableWebs: $availableWebs, category: $category, options: $options)
  }
`

interface Response {
  totalProducts: number
}

export const getTotalProducts = async (availableWebs: string[], category: string, options: FilterOptions): Promise<number> => {
  const variables = {
    availableWebs,
    category,
    options
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
