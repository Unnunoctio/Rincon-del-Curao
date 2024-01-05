import { FilterOptions } from '@/types/types'
import { connectDB, getAvailableWebs, getDrinkMatch } from '../utils'
import { ProductModel } from '../models'

export const getTotalPages = async (availableWebs: string[], category: string, options: FilterOptions): Promise<number> => {
  await connectDB()

  const webs = await getAvailableWebs(availableWebs)
  const drinkMatch = getDrinkMatch(category, options)
  const match: any = {}
  if (options.quantity !== undefined) match.quantity = { $in: options.quantity }

  const products = await ProductModel
    .find(match)
    .populate({ path: 'drink', select: '_id', match: drinkMatch })
    .populate({ path: 'websites', select: '_id', match: { in_stock: true, info: { $in: webs } } })
    .exec()

  const filtered = products.filter((product: any) => product.websites.length > 0 && product.drink !== null)

  const totalPages = Math.ceil(filtered.length / 16)
  if (totalPages === 0) return 1
  return totalPages
}

// ! Deprecated
// import { FilterOptions } from '@/types/types'

// const query = `
//   query Query($availableWebs: [String]!, $category: Category!, $options: OptionsInput!) {
//     totalPages(availableWebs: $availableWebs, category: $category, options: $options)
//   }
// `

// interface Response {
//   totalPages: number
// }

// export const getTotalPages = async (availableWebs: string[], category: string, options: FilterOptions): Promise<number> => {
//   const variables = {
//     availableWebs,
//     category,
//     options
//   }

//   const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
//     },
//     body: JSON.stringify({
//       query,
//       variables
//     }),
//     cache: 'no-store'
//   })

//   const { data }: { data: Response } = await res.json()
//   return data.totalPages
// }
