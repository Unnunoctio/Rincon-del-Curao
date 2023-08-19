import { Filter, FilterOutput, Product } from '../types'
import { OrderByEnum } from '../enums.js'
import ProductModel from '../models/ProductModel.js'
import { generatePath, getOptionsByKey, getProductAverage } from '../helpers/product.js'

const getMatchStage = (filters: Filter): any => {
  const matchStage = {
    'product.category': filters.category
  }
  if (filters.sub_category !== undefined) matchStage['product.sub_category'] = { $in: filters.sub_category }
  if (filters.brand !== undefined) matchStage['product.brand'] = { $in: filters.brand }
  if (filters.content !== undefined) matchStage['product.content'] = { $in: filters.content }

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

export const getFilterOptions = async (root, { filters }: { filters: Filter }): Promise<FilterOutput> => {
  try {
    const { category } = filters

    let products = await ProductModel.aggregate([
      { $unwind: '$websites' },
      { $match: { 'product.category': category } },
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

    const filterOptions: FilterOutput = {
      sub_category: {},
      brand: {},
      content: {}
    }

    //* filter exists
    if (filters.sub_category !== undefined) {
      filterOptions.sub_category = getOptionsByKey(products, 'sub_category', 2)
      products = products.filter(product => filters.sub_category?.includes(product.product.sub_category))
    }
    if (filters.brand !== undefined) {
      filterOptions.brand = getOptionsByKey(products, 'brand', 2)
      products = products.filter(product => filters.brand?.includes(product.product.brand))
    }
    if (filters.content !== undefined) {
      filterOptions.content = getOptionsByKey(products, 'content', 2)
      products = products.filter(product => filters.content?.includes(product.product.content))
    }

    //* not exist filter
    if (filters.sub_category === undefined) filterOptions.sub_category = getOptionsByKey(products, 'sub_category', 2)
    if (filters.brand === undefined) filterOptions.brand = getOptionsByKey(products, 'brand', 2)
    if (filters.content === undefined) filterOptions.content = getOptionsByKey(products, 'content', 2)

    return filterOptions
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

export const getBestDiscountProducts = async (root, args): Promise<Product[]> => {
  try {
    const products = await ProductModel.aggregate([
      { $unwind: '$websites' },
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

    products.sort((a, b) => {
      const discountA = Math.round(100 - (a.websites[0].best_price * 100) / a.websites[0].price)
      const discountB = Math.round(100 - (b.websites[0].best_price * 100) / b.websites[0].price)

      if (discountA !== discountB) return discountB - discountA
      if (a.websites[0].best_price !== b.websites[0].best_price) return a.websites[0].best_price - b.websites[0].best_price
      return a.title.localeCompare(b.title)
    })

    return products.slice(0, 12)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getBestAverageProducts = async (root, args): Promise<Product[]> => {
  try {
    const products = await ProductModel.aggregate([
      { $unwind: '$websites' },
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

    products.sort((a, b) => {
      const averageA = getProductAverage(a.websites)
      const averageB = getProductAverage(b.websites)

      if (averageA !== averageB) return averageB - averageA

      const discountA = Math.round(100 - (a.websites[0].best_price * 100) / a.websites[0].price)
      const discountB = Math.round(100 - (b.websites[0].best_price * 100) / b.websites[0].price)

      if (discountA !== discountB) return discountB - discountA
      if (a.websites[0].best_price !== b.websites[0].best_price) return a.websites[0].best_price - b.websites[0].best_price
      return a.title.localeCompare(b.title)
    })

    return products.slice(0, 12)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getProduct = async (root, args): Promise<Product> => {
  try {
    const { path }: { path: string } = args
    const products = await ProductModel.aggregate([
      { $unwind: '$websites' },
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

    const productsFilter = products.filter(p => generatePath(p._id.toString(), p.product._id.toString(), p.title) === path)
    if (productsFilter.length === 0) throw new Error('Product not found')

    return productsFilter[0]
  } catch (error) {
    throw new Error(error.message)
  }
}

export const isProductPath = async (root, args): Promise<boolean> => {
  try {
    const { path }: { path: string } = args
    const products = await ProductModel.find()
    const productsFilter = products.filter(p => generatePath(p._id.toString(), p.product._id.toString(), p.title) === path)

    return productsFilter.length > 0
  } catch (error) {
    throw new Error(error.message)
  }
}
