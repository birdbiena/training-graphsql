const mysql = require('mysql');
const _ = require('lodash');
const conf = require('./../conf/constant');

class Database {
    constructor() {
        this.pool = mysql.createPool(_.extend({}, conf.mysql));
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection( (err, connection) => {
                connection.query(sql, args, (error, result) => {
                    // 释放池链接
                    connection.release();

                    if (error) {
                        return reject(error);
                    }

                    // 传入Promise
                    resolve(result);
                });
            });
        });
    }

    close() {

    }
}

module.exports = Database;
