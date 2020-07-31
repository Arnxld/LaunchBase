const User = require("../models/User")
const Recipe = require("../models/Recipe")
const File = require("../models/File")
const db = require("../../config/db")
const {date} = require('../../lib/uteis')

module.exports = {
    async home(req,res) {
        let results = await Recipe.all()
        const recipes = results.rows

        return res.render("users/home", {recipes})
    },

    about(req,res) {
        return res.render("users/about")
    },

    async search(req,res) {
        const {filter} = req.query

        let results = await User.recipesSearch(filter)
        let recipes = results.rows

        async function getImage(recipeId) {
            let results = await Recipe.files(recipeId)
            const filesId = results.rows.map(result => result.file_id)
            let filesPromise = filesId.map(id => File.find(id))
            results = await Promise.all(filesPromise)
            let files = results.map(result => result.rows[0])
            const filesURL = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            return filesURL[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        })


        lastRecipes = await Promise.all(recipesPromise)

        return res.render('users/search', {recipes: lastRecipes, filter})
        
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
            return filesURL[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        })

        lastRecipes = await Promise.all(recipesPromise)

        return res.render("users/recipes", {recipes: lastRecipes})
 
    },

    async show(req,res) {
        const {id} = req.params
        let result = await Recipe.find(id)
        const recipe = result.rows[0]
        recipe.updated_at = date(recipe.updated_at).BRformat

        return res.render("users/recipe", {recipe})
     
    },

    async chefs(req, res) {
        let results = await User.chefs()
        const chefs = results.rows
        return res.render("users/chefs", {chefs})
    }
}

