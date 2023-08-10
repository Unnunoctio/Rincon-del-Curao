import { Product } from '../types'
import ProductModel from '../models/ProductModel.js'

const getProducts = async (root, args): Promise<Product[]> => {
  try {
    const { page } = args
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

    const startIndex = (page - 1) * productsPerPage
    return products.slice(startIndex, startIndex + productsPerPage)
  } catch (error) {
    throw new Error(error.message)
  }
}

export {
  getProducts
}
