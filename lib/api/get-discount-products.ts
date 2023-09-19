import { DiscountProduct } from '@/types/api'
import { gql, request } from 'graphql-request'

const query = gql`
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
  const headers = {
    'x-api-key': process.env.API_KEY as string
  }
  const data = await request<Response>(process.env.API_ENDPOINT as string, query, {}, headers)
  return data.bestDiscountProducts
}
