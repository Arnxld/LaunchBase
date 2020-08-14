const db = require('../../config/db')
const { hash } = require('bcryptjs') // password encryption library

module.exports = {
    async all() {
        const results = await db.query(`SELECT * FROM users`)

        return results.rows
    },
    async findOne(filters) {
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            //WHERE | OR | AND
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
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
                is_admin
                )VALUES ($1, $2, $3, $4)
                RETURNING id, email
                `
                
                // gerando uma senha aleatória
                let randomPassword = Math.random().toString(36).slice(-5)
                const passwordHash = await hash(randomPassword, 8)
                
                const values = [
                    data.name,
                    data.email,
                    passwordHash,
                    data.is_admin || false
                ]
                
                const results = await db.query(query, values)
                
                return {
                    id: results.rows[0].id,
                    email: results.rows[0].email,
                    password: randomPassword
                }
            }
                
                catch(err) {
                    console.error(err)
                }
    },
    async update(id, fields) {
        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index, array) => {
            if(index+1 < array.length) {
                query = `${query}
                    ${key} = '${fields[key]}',
                `
            } else {
                // última iteração
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