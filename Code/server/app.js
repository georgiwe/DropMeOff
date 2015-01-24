var express = require('express'),
  http = require('http'),
  path = require('path'),
  favicon = require('static-favicon'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  passportHttp = require('passport-http'),
  expressValidator = require('express-validator');

process.env.SECRET = process.env.SECRET || 'insecure world';

// data
require('./models');
var data = require('./data');
data.connectToDb('mongodb://localhost/tripRoulette');

var app = express();
app.use(express.static(path.join(__dirname, '../client')));

// express configuration
app.use(favicon(path.resolve('../client/images/car.ico')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(expressValidator());

// passport configuration
app.use(passport.initialize());
passport.use(new passportHttp.BasicStrategy(function (username, password, done) {
  if (username === password) {
    done(null, {
      username: username,
      password: password
    });
  } else {
    done(null, null);
  }
}));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  return {
    username: 'deserializedUser',
    password: 'deserUserPass'
  };
});

// create and register API routes
require('./routes/api')(app, data);

app.get('*', function (req, res) {
  res.redirect('/');
});

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: 'Internal Server Error'
  });
});

module.exports = app;