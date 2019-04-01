const express = require('express');
const router = express.Router();
const passport = require('passport');

const config = require('./../conf/base');

router.route('/login').get((req, res) => {
    res.render('sign_in', { message: req.flash('message') });
});

router.route('/login').post((req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            req.flash('message', info.message);
            return res.redirect('/login');
        }

        req.login(user, err => {
            console.log('This is login user :', 'user');

            if (err) {
                return next(err);
            }

            req.flash('message', 'Login Success!');

            return res.cookie('Bearer', config.generateToken({ id: user.id }, 1), { maxAge: 60 * 1000 }).redirect('/');
        });
    })(req, res, next);
});

router.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect('/auth/login');
});

router.route('/register').get((req, res) => {
    res.render('sign_up');
});

module.exports = router;
