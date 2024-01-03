import { TotalOptions } from '@/types/api'
import { FilterOptions } from '@/types/types'

const query = `
  query TotalOptions($availableWebs: [String]!, $category: Category!, $options: OptionsInput!) {
    totalOptions(availableWebs: $availableWebs, category: $category, options: $options) {
      brand {
        label
        count
        value
      }
    }
  }
`

interface Response {
  totalOptions: TotalOptions
}

export const getTotalOptions = async (availableWebs: string[], category: string, options: FilterOptions): Promise<TotalOptions> => {
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
  return data.totalOptions
}
