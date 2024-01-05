/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Product } from '@/types/api'
import { connectDB, generatePath, generateTitle, getAvailableWebs } from '../utils'
import { ProductModel } from '../models'

export const getProduct = async (path: string, availableWebs: string[] = []): Promise<Product | null> => {
  await connectDB()

  const webs = await getAvailableWebs(availableWebs)
  const pathSplit = path.split('-')
  const sku = parseInt(pathSplit[0])

  const product: any = await ProductModel
    .findOne({ sku })
    .populate({ path: 'drink' })
    .populate({ path: 'websites', populate: ['info', 'records'], options: { sort: { best_price: 1 } }, match: { in_stock: true, info: { $in: webs } } })
    .populate({ path: 'images', select: 'large' })
    .exec()

  if (product === null) return null

  const productPath = generatePath(product.drink, product.quantity, product.sku)
  if (productPath !== path) return null

  return {
    title: generateTitle(product.drink.name, product.drink.package, product.drink.content, product.quantity, product.drink.alcoholic_grade),
    brand: product.drink.brand,
    quantity: product.quantity,
    alcoholicGrade: product.drink.alcoholic_grade,
    content: product.drink.content,
    package: product.drink.package,
    category: product.drink.category,
    subCategory: product.drink.sub_category,
    madeIn: product.drink.made_in,
    variety: (product.drink.variety !== undefined) ? product.drink.variety : null,
    bitterness: (product.drink.bitterness !== undefined) ? product.drink.bitterness : null,
    temperature: (product.drink.temperature !== undefined) ? product.drink.temperature : null,
    strain: (product.drink.strain !== undefined) ? product.drink.strain : null,
    vineyard: (product.drink.vineyard !== undefined) ? product.drink.vineyard : null,
    image: product.images.large,
    websites: product.websites.map((website: any) => {
      return {
        name: website.name,
        logo: website.info.logo,
        url: `${website.info.url}${website.path}`,
        price: website.price,
        bestPrice: website.best_price,
        average: website.average,
        records: website.records.map((record: any) => {
          const date = new Date(record.date)
          date.setHours(0, 0, 0, 0)
          return {
            price: record.price,
            date: date.toString()
          }
        })
      }
    })
  }
}

// ! Deprecated
// import { Product } from '@/types/api'

// const query = `
//   query Product($path: ID!, $availableWebs: [String]!) {
//     product(path: $path, availableWebs: $availableWebs) {
//       title
//       brand
//       quantity
//       alcoholicGrade
//       content
//       package
//       category
//       subCategory
//       madeIn
//       variety
//       bitterness
//       temperature
//       strain
//       vineyard
//       image
//       websites {
//         name
//         logo
//         url
//         price
//         bestPrice
//         average
//         records {
//           price
//           date
//         }
//       }
//     }
//   }
// `

// interface Response {
//   product: Product
// }

// export const getProduct = async (path: string, availableWebs: string[] = []): Promise<Product> => {
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
//   return data.product
// }
