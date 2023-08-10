import { Product } from '../types'
import ProductModel from '../models/ProductModel.js'
import { OrderByEnum } from '../enums.js'

const getProducts = async (root, args): Promise<Product[]> => {
  try {
    const { page, orderBy } = args
    const productsPerPage = 12
    const matchStage = {}

    const products = await ProductModel.aggregate([
      { $unwind: '$websites' },
      { $match: matchStage },
      { $sort: { 'websites.best_price': 1 } },
      {
        $group: {
          _id: '$_id',
          websites: { $push: '$websites' },
          otherFields: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: { $mergeObjects: ['$otherFields', { websites: '$websites' }] } } }
    ])

    switch (orderBy) {
      case OrderByEnum.SCORE_DESC:
        products.sort((a, b) => {
          const scoreA = 100 - ((a.websites[0].best_price * 100) / a.websites[0].price)
          const scoreB = 100 - ((b.websites[0].best_price * 100) / b.websites[0].price)
          if (scoreA !== scoreB) return scoreB - scoreA
          if (a.websites[0].best_price !== b.websites[0].best_price) return a.websites[0].best_price - b.websites[0].best_price
          return a.title.localeCompare(b.title)
        })
        break
      case OrderByEnum.PRICE_DESC:
        products.sort((a, b) => {
          if (a.websites[0].best_price !== b.websites[0].best_price) return b.websites[0].best_price - a.websites[0].best_price
          return a.title.localeCompare(b.title)
        })
        break
      case OrderByEnum.PRICE_ASC:
        products.sort((a, b) => {
          if (a.websites[0].best_price !== b.websites[0].best_price) return a.websites[0].best_price - b.websites[0].best_price
          return a.title.localeCompare(b.title)
        })
        break
      case OrderByEnum.NAME_ASC:
        products.sort((a, b) => {
          return a.title.localeCompare(b.title)
        })
        break
      case OrderByEnum.NAME_DESC:
        products.sort((a, b) => {
          return b.title.localeCompare(a.title)
        })
        break
      default:
        throw new Error('Invalid orderBy value')
    }

    const startIndex = (page - 1) * productsPerPage
    return products.slice(startIndex, startIndex + productsPerPage)
  } catch (error) {
    throw new Error(error.message)
  }
}

export {
  getProducts
}
