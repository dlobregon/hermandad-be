const { devotos, createDevoto, editDevoto } = require('./devotosResolvers')

module.exports = {
  Query: {
    devotos
  },
  Mutation: {
    createDevoto,
    editDevoto
  }
}
