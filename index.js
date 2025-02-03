const dotenv = require('dotenv')
dotenv.config()
const { configDB } = require('./db')
configDB()
const { ApolloServer } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const schema = require('./src/graphql/schema')
const resolvers = require('./src/graphql/resolvers')
const server = new ApolloServer({
  typeDefs: schema,
  cors: {
    origin: '*',
    methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept',
      'Authorization'
    ],
    credentials: true,
    exposedHeaders: ['Authorization']
  },
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
})

const port = process.env.PORT || 4000
const host = '0.0.0.0'
server.listen({ port, host }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

module.exports = server
