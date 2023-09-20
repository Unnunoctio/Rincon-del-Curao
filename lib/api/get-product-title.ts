const query = `
  query Query($path: ID!) {
    product(path: $path) {
      title
    }
  }
`
interface Response {
  product: {
    title: string
  }
}

export const getProductTitle = async (path: string): Promise<string | null> => {
  const variables = {
    path
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

  const { data }: { data: Response } = await res.json()
  if (data === null) return null
  return data.product.title
}
