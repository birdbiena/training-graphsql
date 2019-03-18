const LocalStrategy = require('passport-local').Strategy;
const loginDao = require('../features/user/service');

module.exports = passport => {
    passport.serializeUser((user, callback) => {
        callback(null, user[0]['login_name']);
    });

    passport.deserializeUser((login_name, callback) => {
        loginDao.validate(login_name).then((data) => {
            callback(null, data);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'user_name',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        loginDao.validate(email).then((data) => {
            if (!data) {
                // TODO: req.flash还是没有实现
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }

            if (data[0]['password'] !== password) {
                // TODO: req.flash还是没有实现
                return done(null, false, req.flash('loginMessage', 'Wrong Password.'));
            }

            return done(null, data);
        });

    }));
};
