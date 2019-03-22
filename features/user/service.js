const Database = require('../../data/Database');
const user = require('../../data/user_sql');
const database = new Database();

module.exports = {
	add: function(userObj) {
		return database.query(user.user_info.insert, userObj);
	},

	update: function(userObj, id) {
		var arr = [];

		arr.push(userObj.username);
		arr.push(userObj.mobile);
		arr.push(userObj.email);
		arr.push(userObj.address);
		arr.push(userObj.age);
		arr.push(userObj.sex);
		arr.push(userObj.avatar);
		arr.push(id);

		return database.query(user.user_info.update, arr);
	},

	delete: function(key) {
		return database.query(user.user_info.delete, key);
	},

	queryById: function(key) {
        return database.query(user.user_info.queryById, key);
		// return database.query(user.user_login.queryById, key);
	},

	queryAll: function() {
		return database.query(user.user_info.queryAll);
	},

	validate: user_name => {
		return database.query(user.user_login.login, user_name);
	}
};
