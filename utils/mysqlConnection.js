var mysql = require('mysql');

var dbConfig = {
    host: 'mysql',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
