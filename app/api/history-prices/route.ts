import { HistoryPrice } from '@/types/api'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const query = `
  query HistoryPricies($path: ID!, $availableWebs: [String]!) {
    historyPricies(path: $path, availableWebs: $availableWebs) {
      website
      records {
        price
        date
      }
    }
  }
`

interface QueryResponse {
  historyPricies: HistoryPrice[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function GET (request: NextRequest) {
  const cookieStore = cookies()
  const webs = cookieStore.get('prefWebs')?.value

  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')

  const variables = {
    path,
    availableWebs: (webs === undefined) ? [] : webs.split(',')
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
  return Response.json(data.historyPricies)
}
