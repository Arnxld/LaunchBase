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
    }
}