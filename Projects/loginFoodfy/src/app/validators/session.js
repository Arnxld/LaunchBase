const UserModel = require('../models/UserModel')
const {compare} = require('bcryptjs')

async function login(req, res, next) {
    const {email, password} = req.body

    // verificar se o usuário está cadastrado
    const user = await UserModel.findOne({ where: {email} })

    if(!user) return res.render("admins/session/login", {
        user: req.body,
        Error: "Usuário não cadastrado."
    })


    // verificar se a senha confere
    const passed = await compare(password, user.password)

    if(!passed) return res.render("admins/session/login", {
        Error: "Senha incorreta!"
    })

    req.user = user

    next()
}

module.exports = {
    login
}