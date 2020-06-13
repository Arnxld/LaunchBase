const Intl = require('intl')
const {age, degree, date, grade} = require('../../lib/utils')
const Student = require('../models/Student')


module.exports = {
    index(req,res) {

        Student.all(function(students) {
            for (student of students) {
                student.school_year = grade(student.school_year)
            }

            res.render("students/index", {students})
        })
    },
    create(req,res) {

        Student.teacherSelectOptions(function(options) {
            return res.render('students/create', {teacherOptions: options})
        })
    },
    post(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") return res.send('please fill all files')
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)

        })

        return
    },
    show(req,res) {

        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Estudante não encontrado")

            student.age = age(student.birth_date)
            student.birthday = date(student.birth_date).birthDay
            student.schoolyear = grade(student.school_year)

            return res.render("students/show", {student})
        })
    },
    edit(req,res) {
        Student.find(req.params.id, function(student) {

            student.birth_date = date(student.birth_date).iso

            Student.teacherSelectOptions(function(options) {
                
                return res.render("students/edit", {student, teacherOptions: options})
            })

        })
    },
    put(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") return res.send('please fill all files')
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req,res) {
        Student.delete(req.body.id, function() {
            return res.redirect("/students")
        })
    }
 
}
