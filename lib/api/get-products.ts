import { ProductPreview } from '@/types/api'

const query = `
  query Products($orderBy: OrderBy!, $availableWebs: [String]!, $page: Int!, $category: Category!) {
    products(orderBy: $orderBy, availableWebs: $availableWebs, page: $page, category: $category) {
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
  products: ProductPreview[]
}

export const getProducts = async (availableWebs: string[] = [], page: number, category: string): Promise<ProductPreview[]> => {
  const variables = {
    availableWebs,
    orderBy: 'SCORE_DESC',
    page,
    category
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
  return data.products
}
