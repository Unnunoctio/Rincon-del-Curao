import { getCookie } from '@/app/actions'
import { ProductPreview } from '@/types/api'
import { Filter } from '@/types/types'

const query = `
  query Products($availableWebs: [String]!, $orderBy: OrderBy!, $page: Int!, $filter: Filter!) {
    products(availableWebs: $availableWebs, orderBy: $orderBy, page: $page, filter: $filter) {
      path
      title
      price
      bestPrice
      discount
      average
      image
    }
  }
`

interface Response {
  products: ProductPreview[]
}

export const getProducts = async (page: number, orderBy: string, filter: Filter): Promise<ProductPreview[]> => {
  const webs = await getCookie('prefWebs')

  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(','),
    orderBy,
    page,
    filter
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'Products',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.products
}
