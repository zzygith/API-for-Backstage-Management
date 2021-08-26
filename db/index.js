/*  Local database for development
const mysql = require('mysql');
const dp = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
});

module.exports = dp; */

//Database for deploy
const mysql = require('mysql');
const dp = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b13229b98b844e',
    password: '26dcf618',
    database: 'heroku_55c4f1dda096c3a'
});

module.exports = dp;