import { getCookie } from '@/app/actions'
import { getOptions } from '@/helpers/options'
import { ProductPreview } from '@/types/api'
import { SearchParams } from '@/types/types'

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

export const getProducts = async (page: number, orderBy: string, category: string, searchParams: SearchParams): Promise<ProductPreview[]> => {
  const webs = await getCookie('prefWebs')
  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(','),
    orderBy,
    page,
    category,
    options: getOptions(searchParams)
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
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
