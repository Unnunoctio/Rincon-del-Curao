import { getCookie } from '@/app/actions'
import { Website } from '@/types/api'

const query = `
  query ProductWebs($availableWebs: [String]!, $path: ID!) {
    productWebs(availableWebs: $availableWebs, path: $path) {
      name
      url
      price
      bestPrice
      discount
      average
      logo
    }
  }
`

interface Response {
  productWebs: Website[]
}

export const getProductWebsites = async (path: string): Promise<Website[]> => {
  const webs = await getCookie('prefWebs')

  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(','),
    path
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'ProductWebs',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.productWebs
}
