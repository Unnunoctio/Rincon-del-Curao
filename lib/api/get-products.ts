import { getVariablesFilter } from '@/helpers/filter-helper'
import { getDefaultOrderBy } from '@/helpers/order-by-helper'
import { getDefaultPage } from '@/helpers/pagination-helper'
import { ProductList } from '@/types/api'
import { ReadonlyURLSearchParams } from 'next/navigation'

const query = `
  query Query($orderBy: OrderByEnum!, $page: Int!, $filters: FilterInput!) {
    products(orderBy: $orderBy, page: $page, filters: $filters) {
      path
      title
      brand
      alcoholicGrade
      content
      bestPrice
      imageUrl
    }
  }
`
interface Response {
  products: ProductList[]
}

export const getProducts = async (category: string, searchParams: ReadonlyURLSearchParams): Promise<ProductList[]> => {
  const variables = {
    orderBy: getDefaultOrderBy(searchParams.get('order_by')).value,
    page: getDefaultPage(searchParams.get('page')),
    filters: getVariablesFilter(category, searchParams)
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
