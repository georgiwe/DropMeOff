module.exports = function (data) {
  var trips = require('./controllers/trips-controllers')(data),
    validate = require('../../../utils/validator'),
    passport = require('passport'),
    router = require('express').Router();

  router
    .get('/', trips.filter)
    .post('/', passport.authenticate('authStrategy'), trips.create)
    .put('/:id', passport.authenticate('authStrategy'), trips.update)
    .get('/:id', passport.authenticate('authStrategy'), trips.getById)
    .post('/:id', passport.authenticate('authStrategy'), trips.addPassenger)

  return router;
};