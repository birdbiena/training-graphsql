const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

const base = require('./../conf/constant');
const userService = require('./../features/user/service');

module.exports = passport => {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'user_name',
        passwordField: 'password'
    }, (email, password, callback) => {
        return userService.validate(email).then(data => {
            if (!data) {
                return callback(null, false, { message: '用户名或密码无效！' });
            }

            if (data[0]['password'] !== base.md5(password + base.MD5_SUFFIX)) {
                return callback(null, false, { message: '密码错误！' });
            }

            return callback(null, data, { message: '登陆成功！' });
        }).catch(err => {
            return callback(err, false, { message: '登陆接口异常！' });
        });
    }));

    // passport.use(new JWTStrategy({
    //     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //     secretOrKey: base.secret
    // }, (jwtPayload, callback) => {
    //     return userService.queryById(jwtPayload.id)
    //         .then(user => {
    //             return callback(null, user);
    //         })
    //         .catch(err => {
    //             return callback(err);
    //         });
    //     }));
};
