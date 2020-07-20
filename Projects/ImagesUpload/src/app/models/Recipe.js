const db = require("../../config/db")
const {date} = require("../../lib/uteis")


module.exports = {
    all(callback) {
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        `, function(err, results) {
            if(err) throw `database error! ${err}`
            callback(results.rows)
        })
    },
    create(data) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },

    find(id) {
        return db.query(`SELECT * FROM recipes WHERE id = $1`, [id])
    },

    update(data) {
        const query = `
            UPDATE recipes SET
                chef_id = ($1),
                image = ($2),
                title = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
            WHERE id = $7
        `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values)
    },

    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
            if(err) throw `database error! ${err}`
            callback()
        })

    },

    chefsSelectOptions() {
        return db.query(`SELECT name, id FROM chefs ORDER BY name ASC`)
    },

    files(id) {
        return db.query(`SELECT * FROM recipe_files WHERE recipe_id = $1`, [id])
    },
}