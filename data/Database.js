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
                /**
                 * FIXME: 未完成
                 * 关于SQL语句中使用 connection.query("UPDATE posts SET title = :title", { title: "Hello MySQL" });
                 * 参考：https://github.com/mysqljs/mysql#getting-the-id-of-an-inserted-row
                 */
                // connection.config.queryFormat = function(query, values) {
                //     if (!values) return query;

                //     return query.replace(/\:(\w+)/g, function (txt, key) {
                //         if (values.hasOwnProperty(key)) {
                //             return this.escape(values[key]);
                //         }

                //         return txt;
                //     }).bind(this);
                // };

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
