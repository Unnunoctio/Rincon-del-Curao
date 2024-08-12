import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { getOptions } from '@/helpers/options'
import { TotalOptions } from '@/types/api'

const query = `
  query TotalOptions($availableWebs: [String]!, $category: Category!, $options: OptionsInput!) {
    totalOptions(availableWebs: $availableWebs, category: $category, options: $options) {
      priceMin
      priceMax
      gradeMin
      gradeMax
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
      content {
        label
        count
        value
      }
      quantity {
        label
        count
        value
      }
      package {
        label
        count
        value
      }
    }
  }
`

interface QueryResponse {
  totalOptions: TotalOptions
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

  variables.options.brand = variables.options.brand?.map(b => {
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
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data.totalOptions)
}
