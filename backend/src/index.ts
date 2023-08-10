import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import { getProducts } from './queries/product.js'

// Configure Database
mongoose.connect('mongodb://127.0.0.1:27017/Rincon_del_Curao')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error connecting to database', err))

// Configure typeDefs
const typeDefs = `#graphql
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
    image: String!
  }

  type Query {
    products(orderBy: OrderByEnum!, page: Int!): [ProductList]!
  }
`

// Create resolvers
const resolvers = {
  Query: {
    products: getProducts
  },

  ProductList: {
    path: (root) => {
      const idString: string = root._id.toString()
      const pidString: string = root.product._id.toString()
      return idString.substring(idString.length - 3) + pidString.substring(pidString.length - 3)
    },
    title: (root) => root.title,
    brand: (root) => root.product.brand,
    alcoholicGrade: (root) => root.product.alcoholic_grade,
    content: (root) => root.product.content,
    bestPrice: (root) => root.websites[0].best_price,
    image: (root) => root.image_path
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
