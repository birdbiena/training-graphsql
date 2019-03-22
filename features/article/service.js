const Database = require('./../../data/Database');
const sql = require('./../../data/article_sql');
const connect = new Database();

module.exports = {
    add: function (article) {
        return connect.query(sql.article_info.insert, article);
    },

    delete: function (id) {
        return connect.query(sql.article_info.delete, id);
    },

    update: function (item, id) {
        let arr = [];

        arr.push(item.title);
        arr.push(item.describe);
        arr.push(item.content);
        arr.push(item.login_id);
        arr.push(id);

        return connect.query(sql.article_info.update, arr);
    },

    findOne: function (id) {
        return connect.query(sql.article_info.queryById, id);
    },

    findAll: function (state) {
        return connect.query(sql.article_info.queryByAll, state);
    }
};
