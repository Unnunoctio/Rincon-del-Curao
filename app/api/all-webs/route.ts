import { Web } from '@/types/api'
import { cookies } from 'next/headers'

const query = `
  query AllWebs {
    allWebs {
      code
      name
      logo
    }
  }
`

interface QueryResponse {
  allWebs: Web[]
}

export async function GET (): Promise<Response> {
  const cookieStore = cookies()
  const webs = (cookieStore.get('prefWebs')?.value)?.split(',')

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'AllWebs',
      query
    }),
    cache: 'no-store'
  })

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data.allWebs.map(w => {
    return {
      code: w.code,
      name: w.name,
      logo: w.logo,
      checked: (webs === undefined) ? true : webs.includes(w.code)
    }
  }))
}
