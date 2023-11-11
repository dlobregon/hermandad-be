const { devotos, createDevoto, editDevoto } = require('./devotosResolvers')
const { createTurno, turnosByProcesion, disponiblesByProcesion } = require('./turnosResolvers')
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
    turnosByProcesion,
    disponiblesByProcesion
  }
}
