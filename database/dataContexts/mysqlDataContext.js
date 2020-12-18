const mysql = require('mysql');
const dataContext = require('../base/dataContext');

class MysqlDataContext extends dataContext {
    constructor() { }

    static connection() {
        return mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
        });
    }
}

module.exports = MysqlDataContext;