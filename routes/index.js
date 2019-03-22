const express = require('express');
const router = express.Router();

// const jwt = require('./jwt');

const login = require('./login');
const graphql = require('./graphql');
const api = require('./api');
const bodyParser = require('body-parser');

// router.use(jwt);

// Filter Auth
let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

router.route('/').get(isAuthenticated, (req, res) => {
    console.log('This is / :', 'req.user');

    res.render('index', { title: 'Hello Would~~~' });
});

router.use('/login', login);
router.route('/register').get((req, res) => {
    res.render('sign_up');
});

router.use('/api', api); // Ajax请求汇总
router.use('/graphql', bodyParser.text({ type: 'application/graphql' }), graphql);

router.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect('/');
});

// Filter
router.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(err.message);
    }
});

router.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = router;
