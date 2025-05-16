import { GET_ALL_WEBS, GET_ALL_PRODUCTS, GET_ALL_SLUGS, GET_PRODUCT_TITLE } from "@/graphql/queries";
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
    cache: "force-cache"
  })

  const { data }: { data: QueryResponse } = await response.json()
  return data.allWebs
}

export const getAllProducts = async (): Promise<ProductPreview[]> => {
  interface QueryResponse {
    allProducts: ProductPreview[]
  }

  const response = await fetch(process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string
    },
    body: JSON.stringify({
      query: GET_ALL_PRODUCTS
    }),
    cache: "force-cache"
  })

  const { data }: { data: QueryResponse } = await response.json()
  return data.allProducts
}

export const getAllSlugs = async (): Promise<string[]> => {
	interface QueryResponse {
		allSlugs: string[];
	}

	const response = await fetch(
		process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string,
			},
			body: JSON.stringify({
				query: GET_ALL_SLUGS,
			}),
			cache: 'force-cache',
		},
	);

	const { data }: { data: QueryResponse } = await response.json();
	return data.allSlugs;
}

export const getProductTitle = async (slug: string): Promise<string> => {
	interface QueryResponse {
		productTitle: string;
	}

	const response = await fetch(
		process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string,
			},
			body: JSON.stringify({
				query: GET_PRODUCT_TITLE,
				variables: {
					slug: slug,
				},
			}),
			cache: 'force-cache',
		},
	);

	const { data }: { data: QueryResponse } = await response.json();
	return data.productTitle;
}