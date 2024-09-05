import { Product } from '@/types/api'

const query = `
  query Product($path: ID!) {
    product(path: $path) {
      title
      brand
      quantity
      abv
      volume
      packaging
      category
      subCategory
      origin
      variety
      ibu
      servingTemp
      strain
      vineyard
      image
    }
  }
`

interface Response {
  product: Product
}

export const getProduct = async (path: string): Promise<Product> => {
  const variables = {
    path
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'Product',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.product
}
