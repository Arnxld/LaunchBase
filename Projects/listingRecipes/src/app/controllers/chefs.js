const Chef = require("../models/Chef")
const File = require("../models/File")


module.exports = {
    index(req, res) {
        Chef.all(function(chefs) {
            return res.render('admins/chefs/index', {chefs})
        })
    },
    create(req, res) {
        res.render("admins/chefs/create")
    },

    async post(req,res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "") return res.send("Por favor preencha todos os dados da receita.")
        }

        let result = await File.create(req.file)
        let fileId = result.rows[0].id

        result = await Chef.create(req.body, fileId)
        let chefId = result.rows[0].id  



        return res.redirect(`/admin/chefs/${chefId}/edit`)
    },

    show(req, res) {
        const {id} = req.params

        Chef.find(id, function(chef) {

            Chef.showRecipes(id, function(recipes) {
                return res.render('admins/chefs/show', {chef, recipes})
            })
        })
    },
    
    async edit(req, res) {
        const {id} = req.params

        // get chef
        let result = await Chef.find(id)
        const chef = result.rows[0]

        if(!chef) return res.send('Chef not found')

        const fileId = result.rows[0].file_id

        result = await File.find(fileId)
        file = result.rows[0]

        file = {
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }


        return res.render("admins/chefs/edit", {chef, file})
    },

    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "") return res.send("Por favor preencha todos os dados da receita.")
        }

        let result = await Chef.find(req.body.id)
        fileId = result.rows[0].file_id

        if(req.file) {
            result = await File.create(req.file)
            newFileId = result.rows[0].id

            await Chef.update(req.body, newFileId)
            await File.delete(fileId)
        } else {
            await Chef.update(req.body)
        }

        return res.redirect(`/admin/chefs/${req.body.id}/edit`)

    },

    delete(req, res) {
       Chef.delete(req.body.id, function() {
           return res.redirect("/admins/chefs")
       })
    }
}