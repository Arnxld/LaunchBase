const User = require('../models/User')
const {compare} = require("bcryptjs")

async function login(req, res, next) {
    const {email, password} = req.body

    // verificar se o user esta cadastrado
    const user = await User.findOne({ where:{email} })

    if(!user) return res.render("session/login", {
        user: req.body,
        error: "Usuário não cadastrado"
    })

    // verificar se o password bate
    const passed = await compare(password, user.password)

    if(!passed) return res.render('session/login', {
        user: req.body,
        error: "Senha incorreta"
    })

    req.user = user // para tirar o user de dentro do req no controller

    next()
}

async function update(req, res, next) {
    
    
    
}

module.exports = {
    login
}