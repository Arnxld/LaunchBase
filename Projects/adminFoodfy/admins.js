const data = require('./data')
const fs = require('fs')

exports.index = function(req,res) {
    res.render("admins/index", {recipes:data.recipes})
}

exports.create = function(req,res) {
    res.render("admins/create")
}

exports.post = function(req,res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if(req.body[key] == "") return res.send("Por favor preencha todos os dados da receita.")
    }

    const recipe = req.body

    data.recipes.push(recipe)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return "write file"

        return res.redirect("/admin/recipes")
    })
}

exports.show = function(req,res) {
    const {id} = req.params

    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
        if (foundIndex == id) return true
    })

    if(!foundRecipe) return res.send("Receita não encontrada")


    res.render("admins/show", {recipe:foundRecipe, id})
}

exports.edit = function(req,res) {
    const {id} = req.params

    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
        if (foundIndex == id) return true
    })

    if(!foundRecipe) return res.send("Receita não encontrada")

    res.render("admins/edit", {recipe:foundRecipe, id})
}

exports.put = function(req,res) {
    const {id} = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
        if(foundIndex == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundRecipe) return res.send("Receita não encontrada")
    

    const recipe = {
        ...foundRecipe,
        ...req.body,
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("write file error")


        res.redirect(`/admin/recipes/${id}`)
    })

}

exports.delete = function(req,res) {
    const {id} = req.body

    // faz um array com o que retornar true
    const filteredRecipes = data.recipes.filter(function(recipe, foundIndex) {
        return foundIndex != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error')

        res.redirect("/admin/recipes")
    })

}