const client = require('./pg_connect');


module.exports = class PgSql {
    constructor(text, values) {
        this.text = text;
        this.values = values;
    }

    async execute () {

        await client.connect()
        console.log('databese is connected!')

        try {
            const res = await client.query(this.text, this.values)
            console.log(res.rows)
        
            client.end()
        } catch (err) {
            console.log(err.stack)
    
            client.end()
        }
    }
}
