import { getCookie } from '@/app/actions'
import { ProductPreview } from '@/types/api'

const query = `
  query DiscountProducts($availableWebs: [String]!) {
    discountProducts(availableWebs: $availableWebs) {
      path
      title
      brand
      price
      bestPrice
      discount
      average
      preview
    }
  }
`

interface Response {
  discountProducts: ProductPreview[]
}

export const getDiscountProducts = async (): Promise<ProductPreview[]> => {
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
      query,
      variables
    }),
    cache: 'no-store'
  })

  const { data }: { data: Response } = await res.json()
  return data.discountProducts
}
