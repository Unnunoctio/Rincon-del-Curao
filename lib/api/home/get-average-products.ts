import { getCookie } from '@/app/actions'
import { ProductPreview } from '@/types/api'

const query = `
  query AverageProducts($availableWebs: [String]!) {
    averageProducts(availableWebs: $availableWebs) {
      path
      title
      price
      bestPrice
      discount
      average
      image
    }
  }
`

interface Response {
  averageProducts: ProductPreview[]
}

export const getAverageProducts = async (): Promise<ProductPreview[]> => {
  const webs = await getCookie('prefWebs')

  const variables = {
    availableWebs: (webs === undefined) ? [] : webs.split(',')
  }

  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
    },
    body: JSON.stringify({
      operationName: 'AverageProducts',
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.averageProducts
}
