import { ProductPreview } from '@/types/api'
import { cookies } from 'next/headers'

const query = `
  query AverageProducts($availableWebs: [String]!) {
    averageProducts(availableWebs: $availableWebs) {
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

interface QueryResponse {
  averageProducts: ProductPreview[]
}

export async function GET (): Promise<Response> {
  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value

  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(',')
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'AverageProducts',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data.averageProducts)
}
