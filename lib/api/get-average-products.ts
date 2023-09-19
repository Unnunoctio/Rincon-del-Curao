import { AverageProduct } from '@/types/api'

const query = `
  query Query {
    bestAverageProducts {
      path
      title
      brand
      category
      average
      bestPrice
      imageUrl
    }
  }
`
interface Response {
  bestAverageProducts: AverageProduct[]
}

export const getAverageProducts = async (): Promise<AverageProduct[]> => {
  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      query
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.bestAverageProducts
}
