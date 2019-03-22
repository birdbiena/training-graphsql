const express = require('express');
const router = express.Router();
const passport = require('passport');

const article = require('./article');
const users = require('./users');
const comments = require('./comments');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get((req, res) => {
    res.json({code: 1, data: req.user, msg: 'Success!'});
});

router.use('/article', article);
router.use('/users', users);
router.use('/comments', comments);

module.exports = router;
