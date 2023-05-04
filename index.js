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

const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (request, response) => {
    await response.send('Hello World!')
})

app.get('/usuarios', async (request, response) => {
    await pool.query('SELECT * FROM usuario', (error, results) => {
        if (error) { throw error }
        response.status(200).json(results.rows)
    })
})

app.get('/usuario/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    await pool.query('SELECT * FROM usuario WHERE id = $1', [id], (error, results) => {
        if (error) { throw error }
        response.status(200).json(results.rows)
    })
})

app.post('/usuario', async (request, response) => {
    const { nome, login, senha, data_nascimento } = request.body
    await pool.query('INSERT INTO usuario (nome, login, senha, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING id', [nome, login, await hashPassword(senha), data_nascimento], (error, results) => {
        if (error) { throw error }
        response.status(201).send(`Usuário adicionado com sucesso! ID: ${results.rows[0].id}`)
    })
})

app.put('/usuario/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, senha, data_nascimento } = request.body
    await pool.query('UPDATE usuario SET nome = $1, senha = $2, data_nascimento = $3 WHERE id = $4', [nome, await hashPassword(senha), data_nascimento, id], (error, results) => {
        if (error) { throw error }
        response.status(200).send(`Usuário atualizado com sucesso! ID: ${id}`)
    })
})

app.delete('/usuario/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    await pool.query('DELETE FROM usuario WHERE id = $1', [id], (error, results) => {
        if (error) { throw error }
        response.status(200).send(`Usuário deletado com sucesso! ID: ${id}`)
    })
})

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})