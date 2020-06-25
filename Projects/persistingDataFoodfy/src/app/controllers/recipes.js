const Recipe = require('../models/Recipe')

module.exports = {
    index(req,res) {
        Recipe.all(function(recipes) {
            res.render("admins/recipes/index", {recipes})
        })
    },

    create(req,res) {
        Recipe.chefsSelectOptions(function(options) {
            return res.render("admins/recipes/create", {chefOptions:options})
        })
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "") return res.send("Por favor preencha todos os dados da receita.")
        }

        Recipe.create(req.body, function(recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })

    },

    show(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            return res.render('admins/recipes/show', {recipe})
        })
    },

    edit(req,res) {
        Recipe.find(req.params.id, function(recipe) {

            Recipe.chefsSelectOptions(function(options) {
                return res.render('admins/recipes/edit', {recipe, chefOptions:options})
            })
        })
    },

    put(req,res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            console.log(`${key} : ${req.body[key]}`)
            if(req.body[key] == "") return res.send("Por favor preencha todos os dados da receita.")
        }

        Recipe.update(req.body, function() {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },

    delete(req,res) {
        Recipe.delete(req.body.id,function() {
            return res.redirect("/admin/recipes")
        })
    }


}

