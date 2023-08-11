import mongoose from 'mongoose'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { getProducts, getTotalPages, getTotalProducts } from './queries/product.js'

// Configure Database
mongoose.connect('mongodb://127.0.0.1:27017/Rincon_del_Curao')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error connecting to database', err))

// Configure typeDefs
const typeDefs = `#graphql
  input FilterInput {
    category: String!
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

  type Query {
    totalPages(filters: FilterInput!): Int!
    totalProducts(filters: FilterInput!): Int!
    products(orderBy: OrderByEnum!, page: Int!, filters: FilterInput!): [ProductList]!
  }
`

// Create resolvers
const resolvers = {
  Query: {
    totalPages: getTotalPages,
    totalProducts: getTotalProducts,
    products: getProducts
  },

  ProductList: {
    path: (root) => {
      const idString: string = root._id.toString()
      const pidString: string = root.product._id.toString()
      const idPath = idString.substring(idString.length - 3) + pidString.substring(pidString.length - 3)
      const titlePath: string = root.title.toLowerCase().replaceAll('.', '').replaceAll('°', '').replaceAll(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return `${idPath}-${titlePath}`
    },
    title: (root) => root.title,
    brand: (root) => root.product.brand,
    alcoholicGrade: (root) => root.product.alcoholic_grade,
    content: (root) => root.product.content,
    bestPrice: (root) => root.websites[0].best_price,
    imageUrl: (root) => root.image_url
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
