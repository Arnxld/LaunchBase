const data = require('./data')

exports.home = function(req,res) {
    res.render("users/home", {recipes:data.recipes})
}

exports.about = function(req,res) {
    res.render("users/about")
}

exports.recipes = function(req,res) {
    res.render("users/recipes", {recipes : data.recipes})
}

exports.show = function(req,res) {
    const recipeIndex = req.params.index

    return res.render("users/recipe", {recipe: data.recipes[recipeIndex] })
    
}