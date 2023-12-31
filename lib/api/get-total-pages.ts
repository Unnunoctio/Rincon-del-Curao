
const query = `
  query Query($availableWebs: [String]!, $category: Category!) {
    totalPages(availableWebs: $availableWebs, category: $category)
  }
`

interface Response {
  totalPages: number
}

export const getTotalPages = async (availableWebs: string[], category: string): Promise<number> => {
  const variables = {
    availableWebs,
    category
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
    body: JSON.stringify({
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.totalPages
}
