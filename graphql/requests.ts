import { IsSlugExist, ProductDetail, ProductPreview, WebInfo } from '@/graphql/types'
import { generateClient, GraphQLResult } from '@aws-amplify/api'
import { GET_ALL_WEBS, GET_AVERAGE_PRODUCTS, GET_DISCOUNT_PRODUCTS, GET_IS_SLUG_EXIST, GET_PRODUCT_DETAIL } from './queries'

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

export const getIsSlugExist = async (slug: string): Promise<IsSlugExist> => {
  interface QueryResponse {
    isSlugExist: IsSlugExist
  }

  const response = await fetch(process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string
    },
    body: JSON.stringify({
      query: GET_IS_SLUG_EXIST,
      variables: {
        slug
      }
    })
  })

  const { data }: { data: QueryResponse } = await response.json()

  return data.isSlugExist
}

export const getProductDetail = async (slug: string): Promise<ProductDetail> => {
  interface QueryResponse {
    productDetail: ProductDetail
  }

  const response = await fetch(process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string
    },
    body: JSON.stringify({
      query: GET_PRODUCT_DETAIL,
      variables: {
        slug
      }
    }),
    cache: 'force-cache'
  })

  const { data }: { data: QueryResponse } = await response.json()

  return data.productDetail
}
