import { Web } from '@/types/api'

const query = `
  query TotalWebs {
    totalWebs {
      code
      name
      url
      logo
    }
  }
`

interface Response {
  totalWebs: Web[]
}

export const getAllWebs = async (): Promise<Web[]> => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
    body: JSON.stringify({
      query
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.totalWebs
}
