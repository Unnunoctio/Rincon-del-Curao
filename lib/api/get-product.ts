import { Product } from '@/types/api'

const query = `
  query Query($path: ID!) {
    product(path: $path) {
      title
      quantity
      imageUrl
      product {
        name
        brand
        alcoholicGrade
        content
        package
        category
        subCategory
        variety
        bitterness
        strain
        vineyard
        madeIn
      }
      websites {
        name
        logo
        url
        price
        bestPrice
        average
      }
    }
  }
`
interface Response {
  product: Product
}

export const getProduct = async (path: string): Promise<Product | null> => {
  const variables = {
    path
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
  if (data === null) return null
  return data.product
}
