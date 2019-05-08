const _ = require('lodash');
const Database = require('./../../data/Database');
const todo = require('./../../data/todo');
const database = new Database();

module.exports = {
    findALl: function(id) {
        id = id || `099C18124ED811E9B4337E1A06CF0192`;
        return database.query(todo.todo.findAll, id);
    },

    findOne: function(id) {},

    add: function(item) {
        return database.query(todo.todo.insert, item);
    },

    remove: function(ids) {
        return database.query(todo.todo.remove, ids);
    },

    update: function(task) {
        return database.query(todo.todo.update, _.toArray(task));
    }
};
