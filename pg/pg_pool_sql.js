const pool = require('./pg_pool');


// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})



module.exports = class PgSql {
    constructor(text, values) {
        this.text = text;
        this.values = values;
    }

    async execute () {
        // async/await - check out a client
        ;(async () => {
            const client = await pool.connect()
            try {
            const res = await client.query(this.text, this.values)
                console.log(res.rows)
            } catch (err) {
                console.log(err.stack)
            } finally {
                client.release()
            }
        })()
    }
}
