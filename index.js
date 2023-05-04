const express = require('express')
const app = express()
const port = 3000

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'elison',
    host: 'localhost',
    database: 'postgres',
    password: '123@mudar',
    port: 5432,
})

app.get('/', async (request, response) => {
    await response.send('Hello World!')
})

app.get('/usuarios', async (request, response) => {
    await pool.query('SELECT * FROM usuario', (error, results) => {
        if (error) { throw error }
        response.status(200).json(results.rows)
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})