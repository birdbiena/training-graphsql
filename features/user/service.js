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
		// 标记型删除
		return database.query(user.user_info.delete, key);
	},

	queryById: function(key) {
		return database.query(user.user_info.queryById, key);
	},

	queryAll: function() {
		return database.query(user.user_info.queryAll);
	},

	validate: user_name => {
		return database.query(user.user_login.login, user_name);
	}
};
