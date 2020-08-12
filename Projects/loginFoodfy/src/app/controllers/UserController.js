const UserModel = require("../models/UserModel")

module.exports = {
    registerForm(req,res) {
        return res.render("admins/user/register")
    },
    async post(req, res) {
        
        
        return res.send("passed")

        // 
    }
}