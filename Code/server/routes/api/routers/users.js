module.exports = function (data) {
  var users = require('./controllers/users-controllers')(data),
    validate = require('../../../utils/validator'),
    passport = require('passport'),
    router = require('express').Router();

  router
    .get('/', users.getAll)
    .post('/', validate.user.allData, users.register)
    .put('/:id', validate.user.updateData, users.update)
    .get('/:id', users.getById) // Add admin authorization
    .post('/login', validate.user.loginData, passport.authenticate('loginStrategy'), users.login);

  return router;
};