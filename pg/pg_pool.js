require('dotenv').config();

const { Pool } = require("pg");

// // 接続先文字列
const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`;

// DB情報をもったプールを生成
const pool = new Pool({
    connectionString: connectionString,
    // max: 2          // 保持するコネクション数
    idleTimeoutMillis: 600000    // 自動切断時間(ミリ秒)(１分)

});

module.exports = pool;