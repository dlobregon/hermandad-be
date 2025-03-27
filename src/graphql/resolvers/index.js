const { devotos, createDevoto, editDevoto } = require('./devotosResolvers')
const {
  createTurno,
  turnosByProcesion,
  disponiblesByProcesion,
  checkDevotoExtraordinario,
  guardarExtraordinarioProcesion,
  guardarDevotoListaEspera,
  getClaves,
  getClavesDetalleTipoTurno,
  agregarNuevaClave,
  comprarClave,
  inscribir
} = require('./turnosResolvers')
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
    disponiblesByProcesion,
    checkDevotoExtraordinario,
    guardarExtraordinarioProcesion,
    guardarDevotoListaEspera,
    getClaves,
    getClavesDetalleTipoTurno,
    agregarNuevaClave,
    comprarClave,
    inscribir
  }
}
