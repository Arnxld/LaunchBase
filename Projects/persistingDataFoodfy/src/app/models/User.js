const db = require("../../config/db")

module.exports = {
    all(callback) {
        const query = `SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)`
        db.query(query, function(err, results) {
            callback(results.rows)
        })
    },
    
    find(id, callback) {
        db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function(err, results) {
            if(err) throw `database error ${err}`
            callback(results.rows[0])
        })
    },
    
    recipesSearch(filter, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
        `, function(err, results) {
            if(err) throw `database error ${err}`

            callback(results.rows)
        })

    
    },

    chefs(callback) {
        db.query(`
        SELECT chefs.*, count(recipes.*) as total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY total_recipes DESC`, function(err, results) {
            if(err) throw `database error ${err}`
            callback(results.rows)
        })
    },

    recipes(callback) {
        db.query(`
        SELECT recipes.*, chefs.name as chef_name 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        `, function(err, results) {
            if(err) throw `database error ${err}`
            callback(results.rows)
        }) 
    }
}