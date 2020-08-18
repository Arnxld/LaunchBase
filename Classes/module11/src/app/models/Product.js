const db = require('../../config/db')

const Base = require('../models/Base')

Base.init({table: 'products'})

module.exports = {
    ...Base,
    async files(id) {
        
        const results = await db.query(`SELECT * FROM files WHERE product_id = $1`, [id])
        return results.rows
    
    },
    async search(params) {
        const {filter, category} = params
        let query = "",
            filterQuery = `WHERE`

        if(category) {
            filterQuery = `${filterQuery}
            products.category_id = ${category}
            AND`
        }

        filterQuery = `
            ${filterQuery}
            products.name ILIKE '%${filter}%'
            OR products.description ILIKE '%${filter}%'
        `

        // total alternativo

        // let total_query = `(
        //     SELECT count(*) FROM products
        //     ${filterQuery}
        // ) AS total`

        // query = `
        //     SELECT products.*, ${total_query},
        //         categories.name AS category_name
        //     FROM products
        //     LEFT JOIN categories ON (categories.id = products.categoriy_id)
        //     ${filterQuery}
        //     GROUP BY products.id, categories.name
        // `

        query =  `
        SELECT products.*,
            categories.name AS category_name
            FROM products
        LEFT JOIN categories ON (categories.id = products.category_id)
        ${filterQuery}
        `

        const results = await db.query(query)
        return results.rows
    }
}

