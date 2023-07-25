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
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
})
const port = process.env.PORT
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

module.exports = server
