module.exports = function (data) {
  var users = require('./controllers/users-controllers')(data),
    validate = require('../../../utils/validator'),
    router = require('express').Router();

  router
    .get('/', users.getAll)
    .post('/', validate.user.allData, users.register)
    .put('/:id', validate.user.updateData, users.update)
    .post('/login', validate.user.loginData, users.login);

  return router;
};