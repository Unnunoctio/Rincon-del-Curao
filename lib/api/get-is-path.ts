import { IsProduct } from '@/types/api'

const query = `
  query IsPath($path: ID!) {
    isPath(path: $path) {
      isExist
      title
    }
  }
`

interface Response {
  isPath: IsProduct
}

export const getIsPath = async (path: string): Promise<IsProduct> => {
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
      operationName: 'IsPath',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.isPath
}
