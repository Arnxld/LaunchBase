const Intl = require('intl')
const {age, degree, date, grade} = require('../../lib/utils')
const Teacher = require('../models/Teacher')


module.exports = {
    index(req,res) {

        Teacher.all(function(teachers) {
            res.render("teachers/index", {teachers})
        })
    },
    create(req,res) {
        res.render('teachers/create')
    },
    post(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") return res.send('please fill all files')
        }

        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)

        })

        return
    },
    show(req,res) {

        Teacher.find(req.params.id, function(teacher) {
            teacher.age = age(teacher.birth_date)
            teacher.education_level = degree(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", {teacher})
        })
    },
    edit(req,res) {
        Teacher.find(req.params.id, function(teacher) {

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render("teachers/edit", {teacher})
        })
    },
    put(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") return res.send('please fill all files')
        }

        Teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req,res) {
        Teacher.delete(req.body.id, function() {
            return res.redirect("/teachers")
        })
    }
 
}
