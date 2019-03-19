const expressJwt = require('express-jwt');
const conf = require('./../conf/constant');

const jwtAuth = expressJwt({
    secret: conf.secret,
    credentialsRequired: true,
    getToken: function(req) {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        return token;
    }
}).unless({
    path: ['/', '/register', '/login']
});

module.exports = jwtAuth;
