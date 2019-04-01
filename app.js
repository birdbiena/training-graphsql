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
app.use(cors({
    origin: '*'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')))

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/passport')(passport);

app.use(cookieParser());
app.use(
    session({
        name: 'sessionid',
        secret: 'ThanKs123@1.Snail',
        rolling: true,
        resave: true,
        saveUninitialized: false, // 自动延续会话
        cookie: {
            maxAge: 60 * 1000
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);

module.exports = app;
