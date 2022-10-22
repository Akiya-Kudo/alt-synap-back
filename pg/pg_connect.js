const env = require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
    user: env.PG_USER,
    host: "localhost",
    database:  'alt-synap',
    password: env.PG_PASS,
    port: 5432,
})

module.exports = client;