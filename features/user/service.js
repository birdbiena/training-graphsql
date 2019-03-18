const Database = require('../../data/Database');
const user = require('../../data/user_sql');

// const jsonWrite = function(res, ret) {
//     if (typeof ret === 'undefined') {
//         res.json({
//             code: 1,
//             msg: 'failed'
//         });
//     } else {
//         res.json(ret);
//     }
// };

const database = new Database();

module.exports = {
	add: function(user) {
		return database.query(user.insert, user);
	},

	update: function(user, id) {
		var arr = [];

		arr.push(user.username);
		arr.push(user.mobile);
		arr.push(user.email);
		arr.push(user.address);
		arr.push(user.age);
		arr.push(user.sex);
		arr.push(user.avatar);
		arr.push(id);

		return database.query(user.update, arr);
	},

	delete: function(key) {
		// 标记型删除
		return database.query(user.delete, key);
	},

	queryById: function(key) {
		return database.query(user.queryById, key);
	},

	queryAll: function() {
		return database.query(user.queryAll);
	},

	validate: user_name => {
		return database.query(user.login, user_name);
	}
};
