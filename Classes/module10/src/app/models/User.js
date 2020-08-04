const db = require('../../config/db')
const {hash} = require('bcryptjs')
const { update } = require('../controllers/UserController')

module.exports = {
    async findOne(filters) {
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            // WHERE | OR | AND
            query = `${query}
            ${key} 
            `

            Object.keys(filters[key]).map(field => {
                // where email = email
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)

        return results.rows[0]
    },

    async create(data) {
        try {
            const query = `
            INSERT INTO users (
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
            `

            // hash of password (não aparecer no db)
            const passwordHash = await hash(data.password, 8)
            

            const values = [
                data.name,
                data.email,
                passwordHash,
                data.cpf_cnpj.replace(/\D/g, ""), // levar só os números
                data.cep.replace(/\D/g, ""), // levar só os números
                data.address
            ]

            const results = await db.query(query,values)

            return results.rows[0].id
        }
        catch (err){
            console.log(err)
        }
        
    },
    
    async update(id, fields) {

        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${fields[key]},'
                `
            }
            else {
                // last iteration
                query = `${query}
                    ${key} = '${fields[key]}'
                    WHERE id = ${id}
                `
            }
        })

        await db.query(query)
        return

    }
}
