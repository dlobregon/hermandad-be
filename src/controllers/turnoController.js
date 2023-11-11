/* eslint-disable camelcase */
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
  const queryStr = `
  select 
  t.turno
   ,d.dpi as dpi 
  ,d.nombres 
  ,d.apellidos
  ,p.nombre as nombre_procesion
  ,t.cantidad as cantidad
  ,DATE_FORMAT(t.fecha, "%d-%m-%Y") as fecha
  ,tu.nombre as nombre_turno
  ,t.recibo
  from devoto d, procesion p, turno t, tipo_turno tu
  where d.devoto = t.devoto
  and p.procesion = t.procesion
  and p.procesion = ?
  and tu.tipo_turno = t.tipo_turno
  order by t.turno desc
  `

  return new Promise((resolve, reject) => {
    db.query(queryStr, [procesion], (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

const disponiblesByProcesion = ({ procesion, tipo_procesion }) => {
  let queryStr = ''
  if (tipo_procesion !== 4) {
    queryStr = `
      select t.tipo_turno, t.nombre as nombre, 
      case when COALESCE (sum(u.cantidad) , 0 ) > 0
      then p.brazos - sum(u.cantidad) 
      else p.brazos
      end as disponibles
      from procesion p
      LEFT JOIN tipo_turno t 
      on p.tipo_procesion = t.categoria
      and p.sexo = t.sexo
      left join turno u 
      on u.tipo_turno = t.tipo_turno
      and u.procesion = p.procesion
      where p.procesion = ?
      group by t.nombre order by t.nombre
    `
  } else {
    queryStr = `
    select t.tipo_turno, t.nombre as nombre, 
    case when COALESCE (sum(u.cantidad) , 0 ) > 0
      then p.total_turnos - sum(u.cantidad) 
      else p.total_turnos
      end as disponibles
    from procesion p
    LEFT JOIN tipo_turno t 
    on p.tipo_procesion = t.categoria
    and p.sexo = t.sexo
    left join turno u 
    on u.tipo_turno = t.tipo_turno
    and u.procesion = p.procesion
    where p.procesion = ?
    group by t.nombre order by t.nombre
    `
  }
  return new Promise((resolve, reject) => {
    db.query(queryStr, [procesion], (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

module.exports = {
  createTurno,
  turnosByProcesion,
  disponiblesByProcesion
}
