const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes') // o server pega o index automaticamente
const server = express()
const session = require('./config/session')
const methodOverride = require('method-override')

server.use(session)
server.use(express.urlencoded({ extended: true})) // faz o req.body funcionar
server.use (express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false,
    noCache: true
})


server.listen(5000, function() {
    console.log("server is running")
})