const UserModel = require("../models/UserModel")

module.exports = {
    list(req, res) {
        return res.send("ok, cadastrado")
    },
    registerForm(req,res) {
        return res.render("admins/user/register")
    },
    async post(req, res) {
        const userId = await UserModel.create(req.body)

        req.session.userId = userId

        return res.redirect('/admin/users')
    }
}