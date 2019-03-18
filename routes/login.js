const express = require('express');
const router = express.Router();
const passport = require('passport');

const base = require('./../conf/base');

router.route('/')
    .get((req, res) => {
        res.render('sign_in');
    })
    .post(passport.authenticate('local-login', {
        // successRedirect: '/', // FIXME: session需要的跳转功能。
        failureRedirect: '/login'
    }), (req, res) => {
        let PayloadObject = {
            'name': req.body.user_name
        };

        let token = base.generateToken(PayloadObject);

        res.json({
            success: true,
            message: 'success',
            token: token
        });
    });

module.exports = router;
