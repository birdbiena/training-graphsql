const express = require('express');
const router = express.Router();

const jwt = require('./jwt');

const login = require('./login');
const users = require('./users');
const comments = require('./comments');

router.use(jwt);

router.route('/')
	.get((req, res) => {
		res.render('index', {title: 'Hello Would~~~'})
	});

router.route('/register')
    .get((req, res) => {
        res.render('sign_up');
    });

router.use('/login', login);
router.use('/users', users);
router.use('/comments', comments);

router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

router.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

module.exports = router;
