var path = require('path'),
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  favicon = require('static-favicon');

module.exports = function (app) {
  app.use(express.static(path.join(__dirname, '../../client')));
  app.use(favicon(path.resolve('../../client/images/car.ico')));

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
  });

  app.use(logger('dev'));
  app.use(bodyParser.json());
}
