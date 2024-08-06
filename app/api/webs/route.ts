import { Web } from '@/types/api'

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
  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      query
    })
  })

  const { data }: { data: QueryResponse } = await res.json()
  return Response.json(data.totalWebs)
}
