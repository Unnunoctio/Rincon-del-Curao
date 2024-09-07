import { Web } from '@/types/api'

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
  return Response.json(data.allWebs)
}
