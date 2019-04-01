const express = require('express');
const router = express.Router();
const passport = require('passport');

const article = require('./article');
const users = require('./users');
const comments = require('./comments');

// Graphql
const graphql = require('./graphql');
const todo = require('./todo');


router.use('/todo', todo);

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get((req, res) => {
    res.json({code: 1, data: req.user, msg: 'Success!'});
});

router.use('/article', article);
router.use('/users', users);
router.use('/comments', comments);
router.use('/graphql', graphql);

module.exports = router;
