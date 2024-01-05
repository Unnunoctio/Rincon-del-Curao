import { ProductPreview } from '@/types/api'
import { FilterOptions } from '@/types/types'
import { connectDB, generateAverage, generatePath, generateTitle, getAvailableWebs, getDrinkMatch } from '../utils'
import { ProductModel } from '../models'
import { OrderByEnum } from '@/types/enums'

export const getProducts = async (availableWebs: string[] = [], page: number, orderBy: string, category: string, options: FilterOptions): Promise<ProductPreview[]> => {
  await connectDB()

  const webs = await getAvailableWebs(availableWebs)
  const drinkMatch = getDrinkMatch(category, options)
  const match: any = {}
  if (options.quantity !== undefined) match.quantity = { $in: options.quantity }

  const products = await ProductModel
    .find(match)
    .populate({ path: 'drink', select: ['alcoholic_grade', 'brand', 'content', 'name', 'package'], match: drinkMatch })
    .populate({ path: 'websites', select: ['average', 'price', 'best_price'], options: { sort: { best_price: 1 } }, match: { in_stock: true, info: { $in: webs } } })
    .populate({ path: 'images', select: ['small'] })
    .exec()

  const filtered = products.filter((product: any) => product.websites.length > 0 && product.drink !== null)

  switch (orderBy) {
    case OrderByEnum.SCORE_DESC:
      filtered.sort((a: any, b: any) => {
        const scoreA = 100 - ((a.websites[0].best_price * 100) / a.websites[0].price)
        const scoreB = 100 - ((b.websites[0].best_price * 100) / b.websites[0].price)

        if (scoreA !== scoreB) return scoreB - scoreA
        if (a.websites[0].best_price !== b.websites[0].best_price) return a.websites[0].best_price - b.websites[0].best_price
        return a.websites[0].price - b.websites[0].price
      })
      break
    case OrderByEnum.PRICE_DESC:
      filtered.sort((a: any, b: any) => {
        if (a.websites[0].best_price !== b.websites[0].best_price) return b.websites[0].best_price - a.websites[0].best_price
        return b.websites[0].price - a.websites[0].price
      })
      break
    case OrderByEnum.PRICE_ASC:
      filtered.sort((a: any, b: any) => {
        if (a.websites[0].best_price !== b.websites[0].best_price) return a.websites[0].best_price - b.websites[0].best_price
        return a.websites[0].price - b.websites[0].price
      })
      break
    case OrderByEnum.NAME_ASC:
      filtered.sort((a: any, b: any) => {
        const titleA = generateTitle(a.drink.name, a.drink.package, a.drink.content, a.quantity, a.drink.alcoholic_grade)
        const titleB = generateTitle(b.drink.name, b.drink.package, b.drink.content, b.quantity, b.drink.alcoholic_grade)

        return titleA.localeCompare(titleB)
      })
      break
    case OrderByEnum.NAME_DESC:
      filtered.sort((a: any, b: any) => {
        const titleA = generateTitle(a.drink.name, a.drink.package, a.drink.content, a.quantity, a.drink.alcoholic_grade)
        const titleB = generateTitle(b.drink.name, b.drink.package, b.drink.content, b.quantity, b.drink.alcoholic_grade)

        return titleB.localeCompare(titleA)
      })
      break
  }

  // obtener el startIndex
  const startIndex = (page - 1) * 16
  return filtered.slice(startIndex, startIndex + 16).map(product => {
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
// import { FilterOptions } from '@/types/types'

// const query = `
//   query Products($orderBy: OrderBy!, $availableWebs: [String]!, $page: Int!, $category: Category!, $options: OptionsInput!) {
//     products(orderBy: $orderBy, availableWebs: $availableWebs, page: $page, category: $category, options: $options) {
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
//   products: ProductPreview[]
// }

// export const getProducts = async (availableWebs: string[] = [], page: number, orderBy: string, category: string, options: FilterOptions): Promise<ProductPreview[]> => {
//   const variables = {
//     availableWebs,
//     orderBy,
//     page,
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
//   return data.products
// }
