const express = require("express")
const routes = express.Router()
const users = require("./users")
const admins = require("./admins")


routes.get('/', users.home) // página home do site

routes.get('/about', users.about) // sobre o foodfy

routes.get('/recipes', users.recipes) // listagem de receitas

routes.get('/recipes/:index', users.show) // mostra os dados de uma receita



routes.get('/admin/recipes', admins.index) // mostra a lista de receitas no admin

routes.get('/admin/recipes/create', admins.create) // mostra o formulário de criação de uma receita

routes.post('/admin/recipes', admins.post) // cadastra uma nova receita

routes.get('/admin/recipes/:id', admins.show) // mostra os dados de uma receita

routes.get('/admin/recipes/:id/edit', admins.edit) // mostra o formulário de edição de uma receita

routes.put('/admin/recipes', admins.put)

routes.delete('/admin/recipes', admins.delete)


module.exports = routes