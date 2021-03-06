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

exports.put = function(req,res) {
    const {id} = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if(teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("teacher not found")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error in put")

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Error in delete")

        return res.redirect('/teachers')
    })
}