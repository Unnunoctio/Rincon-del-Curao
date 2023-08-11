import { Filter, Product } from '../types'
import { OrderByEnum } from '../enums.js'
import ProductModel from '../models/ProductModel.js'

const getMatchStage = (filters: Filter): any => {
  const matchStage = {
    'product.category': filters.category
  }

  return matchStage
}

export const getTotalPages = async (root, args): Promise<number> => {
  try {
    const { filters }: { filters: Filter } = args
    const productPerPage = 12
    const matchStage = getMatchStage(filters)

    const totalProducts = await ProductModel.countDocuments(matchStage)
    let totalPages = Math.ceil(totalProducts / productPerPage)
    if (totalPages === 0) totalPages = 1

    return totalPages
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getTotalProducts = async (root, args): Promise<number> => {
  try {
    const { filters }: { filters: Filter } = args
    const matchStage = getMatchStage(filters)

    const totalProducts = await ProductModel.countDocuments(matchStage)

    return totalProducts
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getProducts = async (root, args): Promise<Product[]> => {
  try {
    const { page, orderBy, filters }: { page: number, orderBy: string, filters: Filter } = args
    const productsPerPage = 12
    const matchStage = getMatchStage(filters)

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
