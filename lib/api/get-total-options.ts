import { TotalOptions } from '@/types/api'
import { FilterOptions } from '@/types/types'
import { connectDB, getAvailableWebs, getOptionsByKey } from '../utils'
import { ProductModel } from '../models'

export const getTotalOptions = async (availableWebs: string[], category: string, options: FilterOptions): Promise<TotalOptions> => {
  await connectDB()

  const webs = await getAvailableWebs(availableWebs)

  const products = await ProductModel
    .find()
    .populate({ path: 'drink', match: { category } })
    .populate({ path: 'websites', select: '_id', match: { in_stock: true, info: { $in: webs } } })
    .exec()

  const filtered = products.filter(product => product.websites.length > 0 && product.drink !== null)

  return {
    subCategory: getOptionsByKey(filtered, options, 'sub_category', true),
    brand: getOptionsByKey(filtered, options, 'brand', true),
    content: getOptionsByKey(filtered, options, 'content', true),
    quantity: getOptionsByKey(filtered, options, 'quantity', false),
    package: getOptionsByKey(filtered, options, 'package', true)
  }
}

// ! Deprecated
// import { TotalOptions } from '@/types/api'
// import { FilterOptions } from '@/types/types'

// const query = `
//   query TotalOptions($availableWebs: [String]!, $category: Category!, $options: OptionsInput!) {
//     totalOptions(availableWebs: $availableWebs, category: $category, options: $options) {
//       subCategory {
//         label
//         count
//         value
//       }
//       brand {
//         label
//         count
//         value
//       }
//       content {
//         label
//         count
//         value
//       }
//       quantity {
//         label
//         count
//         value
//       }
//       package {
//         label
//         count
//         value
//       }
//     }
//   }
// `

// interface Response {
//   totalOptions: TotalOptions
// }

// export const getTotalOptions = async (availableWebs: string[], category: string, options: FilterOptions): Promise<TotalOptions> => {
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
//   return data.totalOptions
// }
