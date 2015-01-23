var beautify = require('../../../utils/error-beautifier'),
  messages = require('../../../utils/messages'),
  router = require('express').Router(),
  validate = require('../../../utils/validator'),
  _ = require('underscore');

module.exports = function (data) {
  router

  .get('/', function (req, res) {

    data.users
      .all()
      .then(function (users) {
        res.json(users);
      })
      .catch(function (err) {
        res.status(400)
          .json(beautify.databaseError(err));
      });
  })


  .post('/', validate.user.data, function (req, res) {

    var rawErrors = req.validationErrors();

    if (rawErrors) {
      var errors = beautify.validationError(rawErrors);
      res.status(400).json(errors);
      return;
    }

    var userData = req.body;
    // TODO: validate userData !!!

    data.users
      .save(userData)
      .then(function (savedUser) {
        res.status(201)
          .json(savedUser);
      })
      .catch(function (err) {
        res.status(400)
          .json(beautify.databaseError(err));
      });
  })


  .put('/:id', function (req, res) {

    var userData = req.body;
    userData = _.omit(userData, 'password', 'username', 'usernameLowercase', 'salt', 'role');
    userData._id = req.params.id;

    if (userData.isDriver) {
      if (!userData.carModel) {
        res.status(400).json({
          message: messages.missingCarModel
        });
        return;
      }
    } else {
      userData.carModel = '';
    }

    data.users
      .update(userData)
      .then(function (updatedUser) {
        res.json(updatedUser);
      })
      .catch(function (err) {
        res.status(400)
          .json(beautify.databaseError(err));
      });
  })







  // NOT IMPLEMENTED
  // NOT IMPLEMENTED
  // NOT IMPLEMENTED
  .post('/login', function (req, res) {
    req.status(500)
      .json({
        message: 'Not implemented'
      });
  })


  .get('/:id', function (req, res) {
    req.status(500)
      .json({
        message: 'Not implemented'
      });
  });

  return router;
};