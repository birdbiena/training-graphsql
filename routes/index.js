const express = require('express');
const router = express.Router();
// const jwt = require('./jwt');
const login = require('./login');
const api = require('./api');

let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login');
};

router.route('/').get(isAuthenticated, (req, res) => {
    res.render('index', { title: 'Hello Would~~~' });
});

router.use('/auth', login);
router.use('/api', api); // Ajax请求汇总

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
