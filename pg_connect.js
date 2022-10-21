var { Client } = require('pg');

const client = new Client({
    user: "apple",
    host: "localhost",
    database: "alt-synap",
    password: "kygo07",
    port: 5432
})

exports.client.connect();

const text = 'INSERT INTO posts(content) VALUES($1) RETURNING *'
const values = ['brianc']

const sql1 = async () => {
    // async/await
    try {
        const res = await client.query(text, values)
        console.log(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
        console.log(err.stack)
    }
}

sql1()