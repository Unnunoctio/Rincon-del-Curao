import { GET_ALL_WEBS, GET_PRODUCTS } from "@/graphql/queries";
import type { ProductPreview, WebInfo } from "@/graphql/types";

export const getAllWebs = async (): Promise<WebInfo[]> => {
  interface QueryResponse {
    allWebs: WebInfo[]
  }

  const response = await fetch(process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string
    },
    body: JSON.stringify({
      query: GET_ALL_WEBS
    }),
    cache: "force-cache",
    next: { revalidate: false }
  })

  const { data }: { data: QueryResponse } = await response.json()
  return data.allWebs
}

export const getProducts = async (category: string | null): Promise<ProductPreview[]> => {
  interface QueryResponse {
    products: ProductPreview[]
  }

  const response = await fetch(process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string
    },
    body: JSON.stringify({
      query: GET_PRODUCTS,
      variables: {
        category
      }
    }),
    cache: "force-cache",
    next: { revalidate: false }
  })

  const { data }: { data: QueryResponse } = await response.json()
  return data.products
}
