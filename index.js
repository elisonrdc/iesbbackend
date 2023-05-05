const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (request, response) => {
  await response.send('Hello World!')
})

const usuario = require('./usuario')
app.get('/usuarios', usuario.retornaUsuarios)
app.get('/usuario/:id', usuario.retornaUsuario)
app.post('/usuario', usuario.inserirUsuario)
app.put('/usuario/:id', usuario.alterarUsuario)
app.delete('/usuario/:id', usuario.deletarUsuario)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})