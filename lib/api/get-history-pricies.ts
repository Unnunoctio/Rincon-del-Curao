import { HistoryPrice } from '@/types/api'

const query = `
  query HistoryPricies($path: ID!, $availableWebs: [String]!) {
    historyPricies(path: $path, availableWebs: $availableWebs) {
      website
      records {
        price
        date
      }
    }
  }
`

interface Response {
  historyPricies: HistoryPrice[]
}

export const getHistoryPricies = async (path: string, availableWebs: string[]): Promise<HistoryPrice[]> => {
  const variables = {
    path,
    availableWebs
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
  return data.historyPricies
}
