const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');

const index = require('./routes/index');

const app = express();

// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./conf/passport')(passport);

app.use(cookieParser());
app.use(
    session({
        secret: 'ThanKs123@1.Snail',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600000
        }
    })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

module.exports = app;
