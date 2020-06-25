const User = require("../models/User")
const db = require("../../config/db")

module.exports = {
    home(req,res) {
        User.all(function(recipes) {
            return res.render("users/home", {recipes})
        })
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

    recipes(req,res) {
        User.recipes(function(recipes) {
            return res.render("users/recipes", {recipes})
        })
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

