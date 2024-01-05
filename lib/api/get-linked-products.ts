import { ProductLinked } from '@/types/api'
import { connectDB, generatePath, generateTitle, getAvailableWebs } from '../utils'
import { ProductModel } from '../models'

export const getLinkedProducts = async (path: string, availableWebs: string[] = []): Promise<ProductLinked[]> => {
  await connectDB()

  const webs = await getAvailableWebs(availableWebs)
  const pathSplit = path.split('-')
  const sku = parseInt(pathSplit[0])

  const product: any = await ProductModel
    .findOne({ sku })
    .populate({ path: 'drink', select: ['alcoholic_grade', 'brand', 'content', 'name', 'package'] })
    .exec()

  if (product === null) return []
  const productPath = generatePath(product.drink, product.quantity, product.sku)
  if (productPath !== path) return []

  const linkedProducts = await ProductModel
    .find({ drink: product.drink, sku: { $ne: sku } })
    .populate({ path: 'drink', select: ['alcoholic_grade', 'brand', 'content', 'name', 'package'] })
    .populate({ path: 'websites', select: ['average', 'price', 'best_price'], options: { sort: { best_price: 1 } }, match: { in_stock: true, info: { $in: webs } } })
    .exec()

  const filtered = linkedProducts.filter((product: any) => product.websites.length > 0)

  return filtered.sort((a, b) => a.quantity - b.quantity).map(product => {
    return {
      path: generatePath(product.drink, product.quantity, product.sku),
      title: generateTitle(product.drink.name, product.drink.package, product.drink.content, product.quantity, product.drink.alcoholic_grade),
      price: product.websites[0].price,
      bestPrice: product.websites[0].best_price
    }
  })
}

// ! Deprecated
// import { ProductLinked } from '@/types/api'

// const query = `
//   query LinkedProducts($availableWebs: [String]!, $path: ID!) {
//     linkedProducts(availableWebs: $availableWebs, path: $path) {
//       path
//       title
//       price
//       bestPrice
//     }
//   }
// `

// interface Response {
//   linkedProducts: ProductLinked[]
// }

// export const getLinkedProducts = async (path: string, availableWebs: string[] = []): Promise<ProductLinked[]> => {
//   const variables = {
//     path,
//     availableWebs
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
//   return data.linkedProducts
// }
