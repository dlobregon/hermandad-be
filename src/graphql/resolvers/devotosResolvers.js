const { devotoController } = require('../../controllers')

const devotos = () => devotoController.getAllDevotos()

const createDevoto = (parent, args, context) => {
  const newDevoto = { ...args, usuario: 2 }
  return devotoController.saveDevoto(newDevoto)
}
module.exports = {
  devotos,
  createDevoto
}
