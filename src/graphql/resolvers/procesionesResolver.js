const { procesionesController } = require('../../controllers')

const procesionesHabilitadas = () => procesionesController.getProcesionesHabilitadas()
const procesiones = () => procesionesController.getProcesiones()

module.exports = {
  procesiones,
  procesionesHabilitadas
}
