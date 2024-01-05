import { ProductPreview } from '@/types/api'
import { ProductModel } from '../models'
import { connectDB, generateAverage, generatePath, generateTitle, getAvailableWebs } from '../utils'

export const getDiscountProducts = async (availableWebs: string[] = []): Promise<ProductPreview[]> => {
  await connectDB()

  const webs = await getAvailableWebs(availableWebs)

  const products = await ProductModel
    .find()
    .populate({ path: 'drink', select: ['alcoholic_grade', 'brand', 'content', 'name', 'package'] })
    .populate({ path: 'websites', select: ['average', 'price', 'best_price'], options: { sort: { best_price: 1 } }, match: { in_stock: true, info: { $in: webs } } })
    .populate({ path: 'images', select: ['small'] })
    .exec()

  const filtered = products
    .filter((product: any) => product.websites.length > 0)
    .filter((product: any) => Math.round(100 - ((product.websites[0].best_price * 100) / product.websites[0].price)) > 0)

  filtered.sort((a: any, b: any) => {
    const discA = Math.round(100 - ((a.websites[0].best_price * 100) / a.websites[0].price))
    const discB = Math.round(100 - ((b.websites[0].best_price * 100) / b.websites[0].price))

    if (discA !== discB) return discB - discA
    if (a.websites[0].best_price !== b.websites[0].best_price) return b.websites[0].best_price - a.websites[0].best_price
    return a.websites[0].price - b.websites[0].price
  })

  return filtered.slice(0, 12).map(product => {
    return {
      path: generatePath(product.drink, product.quantity, product.sku),
      title: generateTitle(product.drink.name, product.drink.package, product.drink.content, product.quantity, product.drink.alcoholic_grade),
      brand: product.drink.brand,
      price: product.websites[0].price,
      bestPrice: product.websites[0].best_price,
      discount: Math.round(100 - ((product.websites[0].best_price * 100) / product.websites[0].price)),
      average: generateAverage(product.websites),
      preview: product.images.small
    }
  })
}

// ! Deprecated
// import { ProductPreview } from '@/types/api'

// const query = `
//   query DiscountProducts($availableWebs: [String]!) {
//     discountProducts(availableWebs: $availableWebs) {
//       path
//       title
//       brand
//       price
//       bestPrice
//       discount
//       average
//       preview
//     }
//   }
// `

// interface Response {
//   discountProducts: ProductPreview[]
// }

// export const getDiscountProducts = async (availableWebs: string[] = []): Promise<ProductPreview[]> => {
//   const variables = {
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
//   return data.discountProducts
// }
