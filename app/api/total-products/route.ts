import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { getOptions } from '@/helpers/options'

const query = `
  query Query($availableWebs: [String]!, $category: Category!, $options: OptionsInput!) {
    totalProducts(availableWebs: $availableWebs, category: $category, options: $options)
  }
`

interface QueryResponse {
  totalProducts: number
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function GET (request: NextRequest) {
  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value

  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const options = searchParams.get('options')

  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(','),
    category,
    options: getOptions(JSON.parse(options as string))
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

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data.totalProducts)
}
