const { getDb } = require('../../db')
const db = getDb()

const getAllDevotos = () => {
  const queryStr = 'SELECT * FROM devoto'
  return new Promise((resolve, reject) => {
    db.query(queryStr, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}

const saveDevoto = (devoto) => {
  const { altura, telefono, email } = devoto
  const queryStr = `INSERT INTO devoto (dpi, nombres, apellidos, sexo, 
  ${altura === undefined ? '' : 'altura,'}
  ${telefono === undefined ? '' : 'telefono,'}
  ${email === undefined ? '' : 'email,'}
  usuario)
  VALUES (?,?,?,?,
  ${altura === undefined ? '' : '?,'}
  ${telefono === undefined ? '' : '?,'}
  ${email === undefined ? '' : '?,'}
  ?)
  `
  const values = Object.values(devoto)
  return new Promise((resolve, reject) => {
    db.query(queryStr, values, (err, row) => {
      if (err) reject(err)
      resolve({ ...devoto, devoto: row.insertId })
    })
  })
}

module.exports = {
  getAllDevotos,
  saveDevoto
}
