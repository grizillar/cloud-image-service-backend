const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'webapp'
});

conn.connect();

module.exports = conn;