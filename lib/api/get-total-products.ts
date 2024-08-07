import { getCookie } from '@/app/actions'
import { getOptions } from '@/helpers/options'
import { SearchParams } from '@/types/types'

const query = `
  query Query($availableWebs: [String]!, $category: Category!, $options: OptionsInput!) {
    totalProducts(availableWebs: $availableWebs, category: $category, options: $options)
  }
`

interface Response {
  totalProducts: number
}

export const getTotalProducts = async (category: string, searchParams: SearchParams): Promise<number> => {
  const webs = await getCookie('prefWebs')
  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(','),
    category,
    options: getOptions(searchParams)
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
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
