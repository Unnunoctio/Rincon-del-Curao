import { getVariablesFilterByQueryString } from '@/helpers/filterHelper'

// const fetchTotalProducts = async (category: string, searchParams: ReadonlyURLSearchParams): Promise<number> => {
const fetchTotalProducts = async (category: string, queryString: string): Promise<number> => {
  const variables = {
    filters: getVariablesFilterByQueryString(category, queryString)
  }

  const { data }: { data: { totalProducts: number } } = await fetch(process.env.RDC_BACKEND as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      query: `
        query GetTotalProducts($filters: FilterInput!) {
          totalProducts(filters: $filters)
        }
      `,
      variables
    }),
    cache: 'no-cache'
  }).then(async res => await res.json())

  return data.totalProducts
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ProductsCount = async ({ className, category, queryString }: { className: string, category: string, queryString: string }) => {
  const totalProducts = await fetchTotalProducts(category, queryString)

  return (
    <p className={className}>{totalProducts} productos</p>
  )
}
