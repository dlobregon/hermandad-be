const { devotos, createDevoto, editDevoto } = require('./devotosResolvers')
const { createTurno, turnosByProcesion } = require('./turnosResolvers')

module.exports = {
  Query: {
    devotos
  },
  Mutation: {
    createDevoto,
    editDevoto,
    createTurno,
    turnosByProcesion
  }
}
