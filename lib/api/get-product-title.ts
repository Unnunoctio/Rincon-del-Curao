import { IsProduct } from '@/types/api'
import { connectDB, generatePath, generateTitle } from '../utils'
import { ProductModel } from '../models'

export const getProductTitle = async (path: string): Promise<IsProduct> => {
  await connectDB()

  const pathSplit = path.split('-')
  const sku = parseInt(pathSplit[0])

  const product: any = await ProductModel
    .findOne({ sku })
    .populate({ path: 'drink', select: ['alcoholic_grade', 'brand', 'content', 'name', 'package'] })
    .exec()

  if (product === null) return { isExist: false, title: null }

  const productPath = generatePath(product.drink, product.quantity, product.sku)
  if (productPath !== path) return { isExist: false, title: null }

  return {
    isExist: true,
    title: generateTitle(product.drink.name, product.drink.package, product.drink.content, product.quantity, product.drink.alcoholic_grade)
  }
}

// ! Deprecated
// import { IsProduct } from '@/types/api'

// const query = `
//   query Query($path: ID!) {
//     isProductPath(path: $path) {
//       isExist
//       title
//     }
//   }
// `

// interface Response {
//   isProductPath: IsProduct
// }

// export const getProductTitle = async (path: string): Promise<IsProduct> => {
//   const variables = {
//     path
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
//   return data.isProductPath
// }
