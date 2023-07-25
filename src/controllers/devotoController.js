const { getDb } = require('../../db')
const db = getDb()

const getAllDevotos = () => {
  const queryStr = 'Select * FROM devoto'
  return new Promise((resolve, reject) => {
    db.query(queryStr, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}

module.exports = {
  getAllDevotos
}
