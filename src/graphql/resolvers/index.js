const { devotos, createDevoto, editDevoto } = require('./devotosResolvers')
const { createTurno, turnosByProcesion } = require('./turnosResolvers')
const { procesionesHabilitadas, procesiones } = require('./procesionesResolver')

module.exports = {
  Query: {
    devotos,
    procesionesHabilitadas,
    procesiones
  },
  Mutation: {
    createDevoto,
    editDevoto,
    createTurno,
    turnosByProcesion
  }
}
