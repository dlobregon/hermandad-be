const { getDb } = require('../../db')
const db = getDb()

const createTurno = (turno) => {
  const queryStr = `INSERT INTO turno (
        numero, recibo, fecha, tipo_turno, usuario, devoto, procesion, cantidad
        ) values(?, ?, ?, ?, ?, ?, ?, ?)`

  const values = Object.values(turno)
  return new Promise((resolve, reject) => {
    db.query(queryStr, values, (err, row) => {
      if (err) reject(err)
      resolve({ ...turno, turno: row.insertId })
    })
  })
}

const turnosByProcesion = ({ procesion }) => {
  const queryStr = `select d.dpi as dpi 
  ,d.nombres 
  ,d.apellidos
  ,p.nombre as nombre_procesion
  ,t.cantidad as cantidad
  ,t.fecha
  ,t.numero as turno_numero
  from devoto d, procesion p, turno t
  where d.devoto = t.devoto
  and p.procesion = t.procesion
  and p.procesion = ?`

  return new Promise((resolve, reject) => {
    db.query(queryStr, [procesion], (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

module.exports = {
  createTurno,
  turnosByProcesion
}
