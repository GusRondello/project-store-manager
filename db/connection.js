const mysql = require('mysql2/promise');

require('dotenv').config(); 

const database = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = database;