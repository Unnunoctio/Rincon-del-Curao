import mongoose from 'mongoose'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { getBestDiscountProducts, getProduct, getProducts, getTotalPages, getTotalProducts, isProductPath } from './queries/product.js'
import { generatePath } from './helpers/product.js'

// Configure Database
mongoose.connect('mongodb://127.0.0.1:27017/Rincon_del_Curao')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error connecting to database', err))

// Configure typeDefs
const typeDefs = `#graphql
  input FilterInput {
    category: String!
    sub_category: [String]
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

  type Query {
    totalPages(filters: FilterInput!): Int!
    totalProducts(filters: FilterInput!): Int!
    products(orderBy: OrderByEnum!, page: Int!, filters: FilterInput!): [ProductList]!
    bestDiscountProducts: [ProductDiscount]!
    product(path: ID!): Product!
    isProductPath(path: ID!): Boolean!
  }
`

// Create resolvers
const resolvers = {
  Query: {
    totalPages: getTotalPages,
    totalProducts: getTotalProducts,
    products: getProducts,
    bestDiscountProducts: getBestDiscountProducts,
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
