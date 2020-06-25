const Intl = require('intl')
const { age, date } = require('../../lib/utils')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req,res){
        let {filter, page, limit} = req.query

        // caso o usuário não especifique, serão os valores iniciais
        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) { // só movendo a função de lugar
                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }

                return res.render("instructors/index", {instructors, pagination, filter} )

            }
        }

        // o all e o findBy foram substituidos por paginate
        Instructor.paginate(params)


    
        
    },

    create(req,res){
        return res.render("instructors/create")
    },

    post(req,res){
        // Lógica para todos os campos serem obrigatórios
        const keys = Object.keys(req.body)

        for(key of keys) {
            //req.body.key
            if (req.body[key] == "") return res.send("Please fill all files")
        }

        Instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },

    show(req,res){
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instrutor não encontrado!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", {instructor})
        })
    },

    edit(req,res){

        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instrutor não encontrado!")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", {instructor})
        })
        
    },

    put(req,res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            //req.body.key
            if (req.body[key] == "") return res.send("Please fill all files")
        }

        Instructor.update(req.body, function() {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },

    delete(req,res) {
        Instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        })
    },
    

}
