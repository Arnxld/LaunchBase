const UserModel = require("../models/UserModel")

module.exports = {
    registerForm(req,res) {
        return res.render("admins/user/register")
    },
    async post(req, res) {
        // checar se todos os campos estão preenchidos
        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "") {
                return res.send("Por favor preencha todos os campos")
            }
        }

        // checar se o usuário já existe (email)
        const {email} = req.body
        const user = await UserModel.findOne({
            where: {email}
        })

        if(user) return res.send('User already exists')
        
        return res.send("passed")

        // 
    }
}