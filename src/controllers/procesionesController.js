const { getDb } = require('../../db')
const db = getDb()

const getProcesionesHabilitadas = () => {
  const queryStr = 'SELECT * FROM procesion where habilitado = 1'
  return new Promise((resolve, reject) => {
    db.query(queryStr, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}

const getProcesiones = () => {
  const queryStr = 'SELECT * FROM procesion;'
  return new Promise((resolve, reject) => {
    db.query(queryStr, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}

module.exports = {
  getProcesionesHabilitadas,
  getProcesiones
}
