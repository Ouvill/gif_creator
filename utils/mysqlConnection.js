var mysql = require('mysql');

var dbConfig = {
    host: 'mysql',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'flash_gif_maker_db'
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
