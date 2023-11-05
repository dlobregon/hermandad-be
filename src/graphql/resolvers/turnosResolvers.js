const { turnoController } = require('../../controllers')

const createTurno = (parent, args, context) => {
  const newTurno = { ...args }
  return turnoController.createTurno(newTurno)
}

module.exports = {
  createTurno
}
