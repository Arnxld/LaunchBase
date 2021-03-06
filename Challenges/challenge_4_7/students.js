const fs = require('fs')
const data = require('./data.json')
const Intl = require('intl')
const {age, degree, date, grade} = require('./utils')

exports.index = function(req,res) {

    let students = []

    for(item of data.students) {
        const student = {
            ...item,
            school_year: grade(item.school_year)
        }

        students.push(student)
    }


    res.render("students/index", {students})
}

exports.create = function(req, res) {
    res.render('students/create')
}

exports.post = function(req,res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") return res.send('please fill all files')
    }

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent) {
        id = Number(lastStudent.id + 1)
    }

    const birth = Date.parse(req.body.birth)

    data.students.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error')

        return res.redirect('/students')
    })
}

exports.show = function(req,res) {
    const {id} = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        birthday: date(foundStudent.birth).birthDay,
        schoolyear: grade(foundStudent.school_year)
    }

    return res.render("students/show", {student})

}

exports.edit = function(req,res) {
    const {id} = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        birth:date(foundStudent.birth).iso
    }

    return res.render("students/edit", {student})
}

exports.put = function(req,res) {
    const {id} = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if(student.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error in put")

        return res.redirect(`/students/${id}`)
    })
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Error in delete")

        return res.redirect('/students')
    })
}