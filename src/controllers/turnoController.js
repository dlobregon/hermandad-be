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
      t.extraordinario as extraordinario,
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

const checkDevotoExtraordinario = ({ devoto, tipo_turno }) => {
  const queryStr = `select devoto_extraordinario
        from devoto_extraordinario de 
        where de.tipo_turno  = ?
        and devoto= ?`
  return new Promise((resolve, reject) => {
    db.query(queryStr, [tipo_turno, devoto], (err, results) => {
      if (err) reject(err)
      resolve(results[0]?.devoto_extraordinario ?? 0)
    })
  })
}

const guardarExtraordinarioProcesion = (info) => {
  const {
    procesion,
    tipo_turno,
    devoto,
    devoto_extraordinario,
    fecha,
    consesion,
    comentario
  } = info
  const queryStr = `INSERT INTO cortejo_extraodrinario(
    procesion, tipo_turno, devoto, devoto_extraordinario, fecha, consesion, comentario
    ) values(?, ?, ?, ?, ?, ?, ?)`
  const values = [procesion, tipo_turno, devoto, devoto_extraordinario, fecha, consesion, comentario]
  return new Promise((resolve, reject) => {
    db.query(queryStr, values, (err, row) => {
      if (err) reject(err)
      resolve({ ...info })
    })
  })
}

const guardarDevotoListaEspera = (info) => {
  const {
    tipo_turno,
    tipo_procesion,
    devoto
  } = info

  const queryStr = `INSERT INTO lista_espera(
    tipo_turno, tipo_procesion, devoto
    ) values(?, ?, ?)`

  const values = [tipo_turno, tipo_procesion, devoto]

  return new Promise((resolve, reject
  ) => {
    db.query(queryStr, values, (err, row) => {
      if (err) reject(err)
      resolve({ ...info })
    })
  })
}

const checkDevotoListaEspera = ({ devoto, tipo_turno }) => {
  const queryStr = `select count(*) as count
        from lista_espera le 
        where le.tipo_turno  = ?
        and le.devoto= ?
        and le.tipo_procesion = 2`
  return new Promise((resolve, reject) => {
    db.query(queryStr, [tipo_turno, devoto], (err, results) => {
      if (err) reject(err)
      resolve(results[0].count ?? 0)
    })
  })
}

const checkDevotoExtraordinarioProcesion = ({ devoto, tipo_turno, procesion }) => {
  const queryStr = `select count(*) as count
        from cortejo_extraodrinario ce 
        where ce.tipo_turno  = ?
        and ce.devoto= ?
        and ce.procesion = ?`
  return new Promise((resolve, reject) => {
    db.query(queryStr, [tipo_turno, devoto, procesion], (err, results) => {
      if (err) reject(err)
      resolve(results[0].count ?? 0)
    })
  })
}

const getClave = ({ devoto }) => {
  const queryStr = 'select clave from clave_procesion_devoto cpd  where cpd.devoto = ?'
  return new Promise((resolve, reject) => {
    db.query(queryStr, [devoto], (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}

module.exports = {
  createTurno,
  turnosByProcesion,
  disponiblesByProcesion,
  checkDevotoExtraordinario,
  guardarExtraordinarioProcesion,
  guardarDevotoListaEspera,
  checkDevotoListaEspera,
  checkDevotoExtraordinarioProcesion,
  getClave
}
