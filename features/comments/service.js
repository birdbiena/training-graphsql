const Database = require('../../data/Database');
const user = require('../../data/comments_sql');

const database = new Database();

module.exports = {
    queryAll: function(blogid) {
        return database.query(user.queryAll, blogid);
    }
};
