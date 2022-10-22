const pgsql = require('./pg/pg_sql');

const table = "users";
const columns = "firebase_id";
const columns2 = "comment";
const values = ['tessstccsadddabbb'];

const add = new pgsql(`INSERT INTO ${ table }( ${columns} ) VALUES($1) RETURNING *`, values);

const show = new pgsql(`SELECT ${columns} FROM ${table} `);

const update = new pgsql(`UPDATE ${table} SET ${columns2} = 'hello python' WHERE firebase_id='mTsx9YqerAeMFERY7l2a6qndcRm1'`);

const deletesum = new pgsql(`DELETE FROM ${table} WHERE ($2) = ($1)`, [values, columns ]);


show.execute();

// 列名指定は ""
// 行(レコード)指定は ''
