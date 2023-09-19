import { DiscountProduct } from '@/types/api'

const query = `
  query Query {
    bestDiscountProducts {
      path
      title
      brand
      category
      discount
      bestPrice
      imageUrl
    }
  }
`
interface Response {
  bestDiscountProducts: DiscountProduct[]
}

export const getDiscountProducts = async (): Promise<DiscountProduct[]> => {
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
  return data.bestDiscountProducts
}
