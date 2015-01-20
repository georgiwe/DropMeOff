var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportHttp = require('passport-http');

// load models
require('./server/models');

// data
var data = require('./server/data');
data.connectToDb('mongodb://localhost/dropMeOffDb');

var app = express();

// set static folder
app.use(express.static(path.join(__dirname, 'public/app')));

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

// express configuration
app.use(favicon(__dirname + './public/images/car.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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
require('./server/routes/api')(app, data);

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;