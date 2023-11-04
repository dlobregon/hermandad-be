const { devotoController } = require('../../controllers')

const devotos = () => devotoController.getAllDevotos()

const createDevoto = (parent, args, context) => {
  const newDevoto = { ...args, usuario: 2 }
  return devotoController.saveDevoto(newDevoto)
}

const editDevoto = (parent, args, context) => {
  const currentDevoto = { ...args, usuario: 2 }
  return devotoController.editDevoto(currentDevoto)
}

module.exports = {
  devotos,
  createDevoto,
  editDevoto
}
