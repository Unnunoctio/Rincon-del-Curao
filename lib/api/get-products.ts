import { ProductPreview } from '@/types/api'
import { FilterOptions } from '@/types/types'

const query = `
  query Products($orderBy: OrderBy!, $availableWebs: [String]!, $page: Int!, $category: Category!, $options: OptionsInput!) {
    products(orderBy: $orderBy, availableWebs: $availableWebs, page: $page, category: $category, options: $options) {
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

export const getProducts = async (availableWebs: string[] = [], page: number, orderBy: string, category: string, options: FilterOptions): Promise<ProductPreview[]> => {
  const variables = {
    availableWebs,
    orderBy,
    page,
    category,
    options
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
