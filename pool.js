const Pool = require('pg').Pool

const pool = new Pool({
  user: 'elison',
  host: 'localhost',
  database: 'elison',
  password: '123@mudar',
  port: 5432,
})

module.exports = pool