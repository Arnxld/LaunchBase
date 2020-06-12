const Intl = require('intl')
const {age, degree, date, grade} = require('../../lib/utils')


module.exports = {
    index(req,res) {
        res.render("students/index")
    },
    create(req,res) {
        res.render('students/create')
    },
    post(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") return res.send('please fill all files')
        }

        return
    },
    show(req,res) {
        return
    },
    edit(req,res) {
        

        return
    },
    put(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") return res.send('please fill all files')
        }

        return
    },
    delete(req,res) {
        return
    }
 
}
