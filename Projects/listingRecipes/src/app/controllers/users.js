const User = require("../models/User")
const Recipe = require("../models/Recipe")
const File = require("../models/File")
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

        async function getImage(recipeId) {
            let results = await Recipe.files(recipeId)
            const filesId = results.rows.map(result => result.file_id)
            let filesPromise = filesId.map(id => File.find(id))
            results = await Promise.all(filesPromise)
            let files = results.map(result => result.rows[0])
            const filesURL = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            console.log("esse é o que eu to mexendo: ",filesURL[0])

        }

        await getImage(34)

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

