import { ProductLinked } from '@/types/api'

const query = `
  query LinkedProducts($availableWebs: [String]!, $path: ID!) {
    linkedProducts(availableWebs: $availableWebs, path: $path) {
      path
      title
      price
      bestPrice
    }
  }
`

interface Response {
  linkedProducts: ProductLinked[]
}

export const getLinkedProducts = async (path: string, availableWebs: string[] = []): Promise<ProductLinked[]> => {
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
  return data.linkedProducts
}
