import { getCookie } from '@/app/actions'
import { PriceHistory } from '@/types/api'

const query = `
  query ProductHistory($availableWebs: [String]!, $path: ID!) {
    productHistory(availableWebs: $availableWebs, path: $path) {
      website
      priceLogs {
        price
        date
      }
    }
  }
`

interface Response {
  productHistory: PriceHistory[]
}

export const getProductHistory = async (path: string): Promise<PriceHistory[]> => {
  const webs = await getCookie('prefWebs')

  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(','),
    path
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'ProductHistory',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.productHistory
}
