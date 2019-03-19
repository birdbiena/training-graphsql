const express = require('express');
const router = express.Router();
const passport = require('passport');

const base = require('./../conf/base');

router.route('/').get((req, res) => {
    res.render('sign_in');
});

router.route('/').post((req, res, next) => {
    passport.authenticate('local-login', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(200).json({
                code: 0,
                data: user,
                msg: info.message
            });
        }

        req.login(user, { session: false }, err => {
            if (err) res.send(err);

            const token = base.generateToken(user); // 生成token,默认有效1分钟。
            const minutes = 60 * 1000; // 分钟

            return res.cookie('JWT_TOKEN', token, { maxAge: minutes, httpOnly: true })
                .json({
                    code: 1,
                    data: { token },
                    msg: info.message
                }).end();
        });
    })(req, res);
});

module.exports = router;
