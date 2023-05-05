const pool = require('./pool')
const bcrypt = require('./bcrypt')

const retornaUsuarios = async (request, response) => {
  await pool.query('SELECT id, nome, login, data_nascimento FROM usuario', (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const retornaUsuario = async (request, response) => {
  const id = parseInt(request.params.id)
  await pool.query('SELECT id, nome, login, data_nascimento FROM usuario WHERE id = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const inserirUsuario = async (request, response) => {
  const { nome, login, senha, data_nascimento } = request.body
  await pool.query('INSERT INTO usuario (nome, login, senha, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING id', [nome, login, await bcrypt.hashPassword(senha), data_nascimento], (error, results) => {
    if (error) { throw error }
    response.status(201).send(`Usuário adicionado com sucesso! ID: ${results.rows[0].id}`)
  })
}

const alterarUsuario = async (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, senha, data_nascimento } = request.body
  await pool.query('UPDATE usuario SET nome = $1, senha = $2, data_nascimento = $3 WHERE id = $4', [nome, await bcrypt.hashPassword(senha), data_nascimento, id], (error, results) => {
    if (error) { throw error }
    response.status(200).send(`Usuário atualizado com sucesso! ID: ${id}`)
  })
}

const deletarUsuario = async (request, response) => {
  const id = parseInt(request.params.id)
  await pool.query('DELETE FROM usuario WHERE id = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).send(`Usuário deletado com sucesso! ID: ${id}`)
  })
}

module.exports = {
  retornaUsuarios,
  retornaUsuario,
  inserirUsuario,
  alterarUsuario,
  deletarUsuario
}