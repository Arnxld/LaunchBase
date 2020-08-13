const crypto = require('crypto') // bilioteca para criar o token de recuperação
const UserModel = require('../models/UserModel')
const mailer = require('../../lib/mailer')

module.exports = {
    loginForm(req, res) {
        return res.render("admins/session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect("/admin/recipes")
    },
    logout(req, res) {
        req.session.destroy()

        return res.redirect('/login')
    },
    forgotForm(req, res) {
        return res.render('admins/session/forgot-password')
    },
    async forgot(req, res) {
        const {user} = req

        // token para o usuário
        const token = crypto.randomBytes(20).toString('hex')

        // criar uma expiração do token
        let now = new Date()
        now = now.setHours(now.getHours() + 1)

        await UserModel.update(user.id, {
            reset_token: token,
            reset_token_expires: now
        })

        // enviar um email com um link de recuperação
        await mailer.sendMail({
            to:user.email,
            from: 'no-reply@foodfy.com.br',
            subject: "Recuperação de senha",
            html: `<h2>Esqueceu sua senha?</h2>
            <p>Não se preocupe, clique no link abaixo para redefinir sua senha!<p>
            <p>
                <a href="http://localhost:3000/password-reset?token=${token}" target="_blank">
                    clique aqui
                </a>
            <p>
            `
        })

        // avisar o usuário
        return res.render("session/forgot-password", {
            success:"Verifique seu email"
        })
    }
}