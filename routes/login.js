const express = require('express');
const router = express.Router();
const passport = require('passport');

const config = require('./../conf/base');

router.route('/').get((req, res) => {
    res.render('sign_in', { message: req.flash('message') });
});

router.route('/').post((req, res, next) => {
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

            return res.cookie('Bearer', config.generateToken({ id: user.id }, 1), { maxAge: 60 * 1000 })
                .redirect('/');

            // const token = base.generateToken(user); // 生成token,默认有效1分钟。
            // const minutes = 60 * 1000; // 分钟

            // return res.cookie('JWT_TOKEN', token, { maxAge: minutes, httpOnly: true })
            //     .json({
            //         code: 1,
            //         data: { token }
            //     }).end();
        });
    })(req, res, next);
});

module.exports = router;
