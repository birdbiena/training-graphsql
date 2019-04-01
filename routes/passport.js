const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const base = require('./../conf/constant');

const userService = require('./../features/user/service');

module.exports = passport => {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'user_name',
        passwordField: 'password'
    }, (email, password, callback) => {
        return userService.validate(email).then(data => {
            console.log('1.passport_login :', 1);

            if (!data) {
                return callback(null, false, { message: '用户名无效！' });
            }

            if (data[0]['password'] !== base.md5(password + base.MD5_SUFFIX)) {
                return callback(null, false, { message: '密码错误！' });
            }

            return callback(null, data[0], { message: '登陆成功！' });
        });
    }));

    passport.serializeUser((user, done) => {
        console.log('2.serializeUser :', 2);

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('3.deserializeUser :', id);

        userService.queryById(id).then(user_info => {
            done(null, user_info);
        });
    });

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: base.secret
    }, (jwtPayload, done) => {
        console.log('4.JWT :', 'jwtPayload');

        userService.queryById(jwtPayload.sub.id).then(user_info => {
            if (!user_info) {
                return done(null, false);
            }

            return done(null, user_info);
        });
    }));
};
