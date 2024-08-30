import { ProductPreview } from '@/types/api'
import { cookies } from 'next/headers'

const query = `
  query DiscountProducts($availableWebs: [String]!) {
    discountProducts(availableWebs: $availableWebs) {
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
  discountProducts: ProductPreview[]
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
      operationName: 'DiscountProducts',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data.discountProducts)
}
