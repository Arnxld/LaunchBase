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
        user: req.body,
        Error: "Senha incorreta!"
    })

    req.user = user

    next()
}

async function forgot(req, res, next) {
    try{
        const { email, password, passwordRepeat } = req.body

        let user = await UserModel.findOne({ where: {email} })

        if(!user) return res.render("admins/session/forgot-password", {
            user: req.body,
            Error: "Email não cadastrado."
        })

        req.user = user

        next()
    }
    catch(err) {
        console.error(err)

        return res.render("admins/session/forgot-password", {
            user: req.body,
            Error: "Erro inesperado! Tente novamente"
        })
    }
    
}

module.exports = {
    login,
    forgot
}