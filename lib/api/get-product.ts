import { Product } from '@/types/api'

const query = `
  query Product($path: ID!, $availableWebs: [String]!) {
    product(path: $path, availableWebs: $availableWebs) {
      title
      brand
      quantity
      alcoholicGrade
      content
      package
      category
      subCategory
      madeIn
      variety
      bitterness
      temperature
      strain
      vineyard
      image
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

export const getProduct = async (path: string, availableWebs: string[] = []): Promise<Product> => {
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
  return data.product
}
