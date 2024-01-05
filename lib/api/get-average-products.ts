import { ProductPreview } from '@/types/api'

const query = `
  query AverageProducts($availableWebs: [String]!) {
    averageProducts(availableWebs: $availableWebs) {
      path
      title
      brand
      price
      bestPrice
      discount
      average
      preview
    }
  }
`

interface Response {
  averageProducts: ProductPreview[]
}

export const getAverageProducts = async (availableWebs: string[] = []): Promise<ProductPreview[]> => {
  const variables = {
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
  return data.averageProducts
}
