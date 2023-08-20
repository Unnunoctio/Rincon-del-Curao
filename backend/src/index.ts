import mongoose from 'mongoose'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { getBestAverageProducts, getBestDiscountProducts, getFilterOptions, getProduct, getProducts, getTotalPages, getTotalProducts, isProductPath } from './queries/product.js'
import { generatePath, getProductAverage } from './helpers/product.js'

// Configure Database
mongoose.connect('mongodb://127.0.0.1:27017/Rincon_del_Curao')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error connecting to database', err))

// Configure typeDefs
const typeDefs = `#graphql
  input FilterInput {
    category: String!
    sub_category: [String]
    brand: [String]
    content: [Int]
    quantity: [Int]
    package: [String]
  }

  enum OrderByEnum {
    SCORE_DESC
    PRICE_DESC
    PRICE_ASC
    NAME_ASC
    NAME_DESC
  }

  type ProductList {
    path: ID!
    title: String!
    brand: String!
    alcoholicGrade: Float!
    content: Int!
    bestPrice: Int!
    imageUrl: String!
  }

  type ProductDiscount {
    path: ID!
    title: String!
    brand: String!
    category: String!
    discount: Int!
    bestPrice: Int!
    imageUrl: String!
  }

  type ProductAverage {
    path: ID!
    title: String!
    brand: String!
    category: String!
    average: Float!
    bestPrice: Int!
    imageUrl: String!
  }

  type ProductUnit {
    name: String!
    brand: String!
    alcoholicGrade: Float!
    content: Int!
    package: String!
    category: String!
    subCategory: String!
    madeIn: String
    variety: String
    bitterness: String
    strain: String
    vineyard: String
  }

  type Website {
    name: String!
    logo: String!
    url: String!
    price: Int!
    bestPrice: Int!
    average: Float
  }

  type Product {
    title: String!
    quantity: Int!
    imageUrl: String!
    product: ProductUnit!
    websites: [Website]!
  }

  type ObjectString {
    label: String!
    value: String!
  }

  type ObjectNumber {
    label: String!
    value: Int!
  }

  type FilterOptions {
    subCategory: [ObjectString]
    brand: [ObjectString]
    content: [ObjectNumber]
    quantity: [ObjectNumber]
    package: [ObjectString]
  }

  type Query {
    totalPages(filters: FilterInput!): Int!
    totalProducts(filters: FilterInput!): Int!
    filterOptions(filters: FilterInput!): FilterOptions!
    products(orderBy: OrderByEnum!, page: Int!, filters: FilterInput!): [ProductList]!
    bestDiscountProducts: [ProductDiscount]!
    bestAverageProducts: [ProductAverage]!
    product(path: ID!): Product!
    isProductPath(path: ID!): Boolean!
  }
`

// Create resolvers
const resolvers = {
  Query: {
    totalPages: getTotalPages,
    totalProducts: getTotalProducts,
    filterOptions: getFilterOptions,
    products: getProducts,
    bestDiscountProducts: getBestDiscountProducts,
    bestAverageProducts: getBestAverageProducts,
    product: getProduct,
    isProductPath
  },

  ProductList: {
    path: (root) => generatePath(root._id.toString(), root.product._id.toString(), root.title),
    title: (root) => root.title,
    brand: (root) => root.product.brand,
    alcoholicGrade: (root) => root.product.alcoholic_grade,
    content: (root) => root.product.content,
    bestPrice: (root) => root.websites[0].best_price,
    imageUrl: (root) => root.image_url
  },
  ProductDiscount: {
    path: (root) => generatePath(root._id.toString(), root.product._id.toString(), root.title),
    title: (root) => root.title,
    brand: (root) => root.product.brand,
    category: (root) => root.product.category,
    discount: (root) => Math.round(100 - ((root.websites[0].best_price * 100) / root.websites[0].price)),
    bestPrice: (root) => root.websites[0].best_price,
    imageUrl: (root) => root.image_url
  },
  ProductAverage: {
    path: (root) => generatePath(root._id.toString(), root.product._id.toString(), root.title),
    title: (root) => root.title,
    brand: (root) => root.product.brand,
    category: (root) => root.product.category,
    average: (root) => getProductAverage(root.websites),
    bestPrice: (root) => root.websites[0].best_price,
    imageUrl: (root) => root.image_url
  },
  ProductUnit: {
    name: (root) => root.name,
    brand: (root) => root.brand,
    alcoholicGrade: (root) => root.alcoholic_grade,
    content: (root) => root.content,
    package: (root) => root.package,
    category: (root) => root.category,
    subCategory: (root) => root.sub_category,
    madeIn: (root) => root.made_in,
    variety: (root) => root.variety,
    bitterness: (root) => root.bitterness,
    strain: (root) => root.strain,
    vineyard: (root) => root.vineyard
  },
  Website: {
    name: (root) => root.name,
    logo: (root) => root.logo,
    url: (root) => root.url,
    price: (root) => root.price,
    bestPrice: (root) => root.best_price,
    average: (root) => root.average
  },
  Product: {
    title: (root) => root.title,
    quantity: (root) => root.quantity,
    imageUrl: (root) => root.image_url,
    product: (root) => root.product,
    websites: (root) => root.websites
  },
  FilterOptions: {
    subCategory: (root) => Object.entries(root.sub_category).map(([key, value]: [string, number]) => { return { label: `${key} (${value})`, value: key } }).sort((a, b) => a.value.localeCompare(b.value)),
    brand: (root) => Object.entries(root.brand).map(([key, value]: [string, number]) => { return { label: `${key} (${value})`, value: key } }).sort((a, b) => a.value.localeCompare(b.value)),
    content: (root) => Object.entries(root.content).map(([key, value]: [string, number]) => { return { label: (parseInt(key) > 1000 ? `${(parseInt(key) / 1000).toFixed(1)}L (${value})` : `${parseInt(key)}cc (${value})`), value: parseInt(key) } }).sort((a, b) => a.value - b.value),
    quantity: (root) => Object.entries(root.quantity).map(([key, value]: [string, number]) => { return { label: `${key} ${(parseInt(key) > 1) ? 'Unidades' : 'Unidad'} (${value})`, value: parseInt(key) } }).sort((a, b) => a.value - b.value),
    package: (root) => Object.entries(root.package).map(([key, value]: [string, number]) => { return { label: `${key} (${value})`, value: key } }).sort((a, b) => a.value.localeCompare(b.value))
  }
}

// Add server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// Start server
const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 }
})

console.log(`Server is running at: ${url}`)
