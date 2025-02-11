import { ProductPreview, WebInfo } from '@/graphql/types'
import { generateClient, GraphQLResult } from '@aws-amplify/api'
import { GET_ALL_WEBS, GET_AVERAGE_PRODUCTS, GET_DISCOUNT_PRODUCTS } from './queries'

const API = generateClient()

export const getAllWebs = async (): Promise<WebInfo[]> => {
  interface QueryResponse {
    allWebs: WebInfo[]
  }

  const response = await API.graphql({
    query: GET_ALL_WEBS
  }) as GraphQLResult<QueryResponse>

  return response.data.allWebs
}

export const getDiscountProducts = async (availableWebs: string[]): Promise<ProductPreview[]> => {
  interface QueryResponse {
    discountProducts: ProductPreview[]
  }

  const response = await API.graphql({
    query: GET_DISCOUNT_PRODUCTS,
    variables: {
      availableWebs
    }
  }) as GraphQLResult<QueryResponse>

  return response.data.discountProducts
}

export const getAverageProducts = async (availableWebs: string[]): Promise<ProductPreview[]> => {
  interface QueryResponse {
    averageProducts: ProductPreview[]
  }

  const response = await API.graphql({
    query: GET_AVERAGE_PRODUCTS,
    variables: {
      availableWebs
    }
  }) as GraphQLResult<QueryResponse>

  return response.data.averageProducts
}
