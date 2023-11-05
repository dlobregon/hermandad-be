const { devotos, createDevoto, editDevoto } = require('./devotosResolvers')
const { createTurno } = require('./turnosResolvers')

module.exports = {
  Query: {
    devotos
  },
  Mutation: {
    createDevoto,
    editDevoto,
    createTurno
  }
}
