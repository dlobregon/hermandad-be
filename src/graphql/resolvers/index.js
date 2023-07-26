const { devotos, createDevoto } = require('./devotosResolvers')

module.exports = {
  Query: {
    devotos
  },
  Mutation: {
    createDevoto
  }
}
