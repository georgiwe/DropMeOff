var express = require('express'),
  http = require('http'),
  path = require('path'),
  favicon = require('static-favicon'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  passportHttp = require('passport-http'),
  expressValidator = require('express-validator');

// load models
require('./models');

// data
var data = require('./data');
data.connectToDb('mongodb://localhost/tripRoulette');

var app = express();

// set static folder
app.use(express.static(path.join(__dirname, '../client')));

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

// express configuration
app.use(favicon(path.resolve('../client/images/car.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: true
//}));
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