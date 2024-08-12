import { Web } from '@/types/api'
import { cookies } from 'next/headers'

const query = `
  query TotalWebs {
    totalWebs {
      code
      name
      logo
    }
  }
`

interface QueryResponse {
  totalWebs: Web[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function GET () {
  const cookieStore = cookies()
  const webs = (cookieStore.get('prefWebs')?.value)?.split(',')

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      query
    }),
    cache: 'no-store'
  })

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data.totalWebs.map(w => {
    return {
      code: w.code,
      name: w.name,
      logo: w.logo,
      checked: (webs === undefined) ? true : webs.includes(w.code)
    }
  }))
}
