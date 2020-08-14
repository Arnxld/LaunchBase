const UserModel = require('../models/UserModel')

function onlyUsers(req, res, next) {
    if(!req.session.userId)
        return res.redirect('/login')


    next()
}

function isLogged(req, res, next) {
    if(req.session.userId)
        return res.redirect('/admin/profile')

    next()
}

async function isAdmin(req, res, next) {
    const {userId: id} = req.session

    if(!id) {
        return res.redirect('/')
    }
    const user = await UserModel.findOne( {where: {id}})

    if(!user.is_admin) {
        return res.redirect('/')
    }
    
    next()
}

module.exports = {
    onlyUsers,
    isLogged,
    isAdmin
}