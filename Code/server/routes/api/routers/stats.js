module.exports = function (data) {
  var router = require('express').Router(),
    stats = require('./controllers/stats-controllers')(data);

  router
    .get('/top-drivers', stats.topDrivers);

  return router;
};