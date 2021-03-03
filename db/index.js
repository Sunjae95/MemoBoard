const mysql = require('mysql2/promise');

const env = process.env;

const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DATABASE,
    port: env.DB_PORT,
    connectionLimit: 10,
});

module.exports = pool;
