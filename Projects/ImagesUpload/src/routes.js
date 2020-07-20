const express = require("express")
const routes = express.Router()
const multer = require("./app/middlewares/multer") // o multer permite o envio de dados ao back-end
const users = require("./app/controllers/users")
const recipes = require("./app/controllers/recipes")
const chefs = require("./app/controllers/chefs")


routes.get('/', users.home) // página home do site

routes.get('/about', users.about) // sobre o foodfy

routes.get('/search', users.search) // busca por receitas

routes.get('/recipes', users.recipes) // listagem de receitas

routes.get('/recipes/:id', users.show) // mostra os dados de uma receita

routes.get('/chefs', users.chefs)



routes.get('/admin/recipes', recipes.index) // mostra a lista de receitas no admin

routes.get('/admin/recipes/create', recipes.create) // mostra o formulário de criação de uma receita

// recebendo um Array de arquivos no campo "photos" limitado a 5 arquivos
routes.post('/admin/recipes', multer.array("photos", 5), recipes.post) // cadastra uma nova receita

routes.get('/admin/recipes/:id', recipes.show) // mostra os dados de uma receita

routes.get('/admin/recipes/:id/edit', recipes.edit) // mostra o formulário de edição de uma receita

routes.put('/admin/recipes', multer.array("photos", 5), recipes.put)

routes.delete('/admin/recipes', recipes.delete)



routes.get('/admin/chefs', chefs.index)

routes.get('/admin/chefs/create', chefs.create) // mostra o formulário de cadastro de um chefs

routes.post('/admin/chefs', chefs.post) // cadastra o chef

routes.get('/admin/chefs/:id', chefs.show) // mostra o chef

routes.get('/admin/chefs/:id/edit', chefs.edit) // formulário de edição

routes.put('/admin/chefs', chefs.put) // edita o chefe

routes.delete('/admin/chefs', chefs.delete) // deleta o chefe

module.exports = routes