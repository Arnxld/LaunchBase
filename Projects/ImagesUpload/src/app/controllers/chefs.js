const Chef = require("../models/Chef")

module.exports = {
    index(req, res) {
        Chef.all(function(chefs) {
            return res.render('admins/chefs/index', {chefs})
        })
    },
    create(req, res) {
        res.render("admins/chefs/create")
    },

    post(req,res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "") return res.send("Por favor preencha todos os dados da receita.")
        }

        Chef.create(req.body, function(chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    show(req, res) {
        const {id} = req.params

        Chef.find(id, function(chef) {

            Chef.showRecipes(id, function(recipes) {
                return res.render('admins/chefs/show', {chef, recipes})
            })
        })
    },
    
    edit(req, res) {
        const {id} = req.params

        Chef.find(id, function(chef) {
            if(!chef) return res.send('Chef not found')

            return res.render("admins/chefs/edit", {chef})
        })
    },

    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "") return res.send("Por favor preencha todos os dados da receita.")
        }

        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    delete(req, res) {
       Chef.delete(req.body.id, function() {
           return res.redirect("/admins/chefs")
       })
    }
}