const fs = require('fs')
const data = require('./data.json')
const Intl = require('intl')
const {age, degree, date} = require('./utils')

exports.post = function(req,res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") return res.send('please fill all files')
    }

    let {avatar_url, name, birth, degree, class_type, classes} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        class_type,
        classes,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error')

        return res.redirect('/')
    })
}

exports.show = function(req,res) {
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("teacher not found")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        degree: degree(foundTeacher.degree),
        classes: foundTeacher.classes.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", {teacher})

}

exports.edit = function(req,res) {
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("teacher not found")

    const teacher = {
        ...foundTeacher,
        birth:date(foundTeacher.birth)
    }

    return res.render("teachers/edit", {teacher})
}