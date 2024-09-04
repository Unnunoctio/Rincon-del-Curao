import { ProductsProps } from '@/types/api'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const query = `
  query ProductsProps($availableWebs: [String]!, $filter: Filter!) {
    totalCount(availableWebs: $availableWebs, filter: $filter)
    totalPages(availableWebs: $availableWebs, filter: $filter)
    filterOptions(availableWebs: $availableWebs, filter: $filter) {
      subCategory {
        label
        count
        value
      }
      brand {
        label
        count
        value
      }
      volume {
        label
        count
        value
      }
      quantity {
        label
        count
        value
      }
      packaging {
        label
        count
        value
      }
      priceMin
      priceMax
      abvMin
      abvMax
    }
  }
`

interface QueryResponse extends ProductsProps {}

export async function GET (request: NextRequest): Promise<Response> {
  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value

  const searchParams = request.nextUrl.searchParams
  const filter = searchParams.get('filter')

  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(','),
    filter: JSON.parse(filter as string)
  }

  variables.filter.brand = variables.filter.brand?.map((b: any) => {
    if (b === ' 56') return '+56'
    return b
  })

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'ProductsProps',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data)
}
