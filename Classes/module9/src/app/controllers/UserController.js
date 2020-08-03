const User = require('../models/User')

module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },
    async post(req,res) {
        // check if has all fields
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send('Please fill all files')
            }
        }

        // check if user exists (email, cpf_cnpj are unique)
        let {email, cpf_cnpj, password, passwordRepeat} = req.body

        cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
        
        const user = await User.findOne({
            where: {email},
            or: {cpf_cnpj}
        })

        if(user) return res.send("User already exists")

        // check if password matches
        if(password != passwordRepeat) return res.send("Password mismatch!")
        
        return res.send('passed')
    }   
}