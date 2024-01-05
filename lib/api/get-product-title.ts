import { IsProduct } from '@/types/api'

const query = `
  query Query($path: ID!) {
    isProductPath(path: $path) {
      isExist
      title
    }
  }
`

interface Response {
  isProductPath: IsProduct
}

export const getProductTitle = async (path: string): Promise<IsProduct> => {
  const variables = {
    path
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
  return data.isProductPath
}
