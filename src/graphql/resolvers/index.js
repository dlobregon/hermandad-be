const { devotos, createDevoto, editDevoto } = require('./devotosResolvers')
const { createTurno, turnosByProcesion } = require('./turnosResolvers')

module.exports = {
  Query: {
    devotos,
    turnosByProcesion
  },
  Mutation: {
    createDevoto,
    editDevoto,
    createTurno
  }
}
