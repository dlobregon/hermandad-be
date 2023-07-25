const { devotoController } = require('../../controllers')

const devotos = () => devotoController.getAllDevotos()

module.exports = {
  devotos
}
