const pool = require('./pool')
const bcrypt = require('./bcrypt')

const retornaUsuarios = async (request, response) => {
  pool.query('SELECT id, nome, login, data_nascimento FROM usuario').then((results) => {
    response.status(200).json(results.rows)
  }).catch(e => {
    let msgError = ('Ocorreu um erro: '+e.message)
    console.error(msgError); response.status(500).send(msgError)
  })
}

const retornaUsuario = async (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT id, nome, login, data_nascimento FROM usuario WHERE id = $1', [id]).then((results) => {
    response.status(200).json(results.rows)
  }).catch(e => {
    let msgError = ('Ocorreu um erro: '+e.message)
    console.error(msgError); response.status(500).send(msgError)
  })
}

const inserirUsuario = async (request, response) => {
  const { nome, login, senha, data_nascimento } = request.body
  pool.query('INSERT INTO usuario (nome, login, senha, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING id', [nome, login, await bcrypt.hashPassword(senha), data_nascimento]).then((results) => {
    response.status(201).send(`Usuário adicionado com sucesso! ID: ${results.rows[0].id}`)
  }).catch(e => {
    let msgError = ('Ocorreu um erro: '+e.message)
    console.error(msgError); response.status(500).send(msgError)
  })
}

const alterarUsuario = async (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, senha, data_nascimento } = request.body
  pool.query('UPDATE usuario SET nome = $1, senha = $2, data_nascimento = $3 WHERE id = $4', [nome, await bcrypt.hashPassword(senha), data_nascimento, id]).then((results) => {
    response.status(200).send(`Usuário atualizado com sucesso! ID: ${id}`)
  }).catch(e => {
    let msgError = ('Ocorreu um erro: '+e.message)
    console.error(msgError); response.status(500).send(msgError)
  })
}

const deletarUsuario = async (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM usuario WHERE id = $1', [id]).then((results) => {
    response.status(200).send(`Usuário deletado com sucesso! ID: ${id}`)
  }).catch(e => {
    let msgError = ('Ocorreu um erro: '+e.message)
    console.error(msgError); response.status(500).send(msgError)
  })
}

module.exports = {
  retornaUsuarios,
  retornaUsuario,
  inserirUsuario,
  alterarUsuario,
  deletarUsuario
}