const mysql = require('mysql')
let db = null

const configDB = () => {
  db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
  db.connect()
}

const closeDatabase = () => {
  db.end()
}

const getDb = () => {
  if (db) return db
  configDB()
  return db
}

module.exports = {
  getDb,
  closeDatabase,
  configDB
}
