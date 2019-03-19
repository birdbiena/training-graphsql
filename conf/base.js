const jwt = require('jsonwebtoken');
const conf = require('./constant');

let verify = (token, callback) => {
    try {
        return jwt.verify(token, conf.secret, callback);
    } catch (e) {
        throw new Error('jwt token not verified');
    }
};

let generateToken = (user, minutes) => {
    let secret = conf.secret;
    let _minutes = minutes || 1;

    return jwt.sign({
        sub: user
    }, secret, {
        expiresIn: 60 * _minutes // 1小时
    });
}

module.exports = { verify, generateToken }
