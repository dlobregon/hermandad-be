const { turnoController } = require('../../controllers')

const createTurno = (parent, args, context) => {
  const newTurno = { ...args }
  return turnoController.createTurno(newTurno)
}

const turnosByProcesion = (parent, args, context) => {
  return turnoController.turnosByProcesion(args)
}

module.exports = {
  createTurno,
  turnosByProcesion
}
