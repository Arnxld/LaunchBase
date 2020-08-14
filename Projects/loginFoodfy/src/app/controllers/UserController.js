const UserModel = require("../models/UserModel")
const mailer = require('../../lib/mailer')

module.exports = {
    async list(req, res) {
        const users = await UserModel.all()
        return res.render("admins/user/index", {users})
    },
    registerForm(req,res) {
        return res.render("admins/user/register")
    },
    async post(req, res) {
        const {id, email, password} = await UserModel.create(req.body)

        const user = await UserModel.findOne({ where: {id} })

        await mailer.sendMail({
            to:email,
            from: 'no-reply@foodfy.com.br',
            subject: "Dados de acesso ao Foodfy",
            html: `<h2>Seja bem vindo ao Foodfy, ${user.name}</h2>
            <p>Agora com sua conta criada, você é oficialmente um membro da nossa comunidade!<p>
            <br>
            <p>Aqui estão seus dados de acesso à plataforma:<p>
            <p>Usuário: ${email}
            <p>Senha: ${password}<p>
            <br>
            <p> Lembre-se de que pode alterar sua senha a qualquer momento dentro da plataforma.<p>
            `
        })

        // avisar o usuário
        return res.render("admins/user/index", {
            createSuccess:"Email enviado ao usuário!"
        })
    },
    async updateForm(req, res) {
        const id = req.params.id

        const user = await UserModel.findOne({ where: {id} })
        return res.render("admins/user/edit", {user})
    }
}