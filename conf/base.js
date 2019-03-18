const jwt = require('jsonwebtoken');
const conf = require('./db');

/**
 * 验证token,可以综合进业务流程中.
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
module.exports.verify = (token, callback) => {
	try {
		return jwt.verify(token, conf.secret, callback);
	} catch (e) {
		throw new Error('jwt token not verified');
	}
};

/**
 * 创建认证Token
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
module.exports.generateToken = (user) => {
    let secret = conf.secret;

	return jwt.sign({
		sub: user
	}, secret, {
        expiresIn: 60 // 1小时
    });
};
