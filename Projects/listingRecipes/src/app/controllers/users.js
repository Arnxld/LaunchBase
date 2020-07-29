const User = require("../models/User")
const Recipe = require("../models/Recipe")
const db = require("../../config/db")

module.exports = {
    async home(req,res) {
        let results = await Recipe.all()
        const recipes = results.rows

        return res.render("users/home", {recipes})
    },

    about(req,res) {
        return res.render("users/about")
    },

    search(req,res) {
        const {filter} = req.query

        User.recipesSearch(filter, function(recipes) {
            return res.render('users/search', {recipes, filter})
        })
    },

    async recipes(req,res) {
        let results = await Recipe.all()
        const recipes = results.rows

        return res.render("users/recipes", {recipes})
 
    },

    show(req,res) {
        const {id} = req.params
        User.find(id, function(recipe) {
            return res.render("users/recipe", {recipe})
        })
    },

    chefs(req, res) {
        User.chefs(function(chefs) {
            return res.render("users/chefs", {chefs})
        })
    }
}

