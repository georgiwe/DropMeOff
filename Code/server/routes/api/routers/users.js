var beautify = require('../../../utils/mongoose-error-beautifier'),
  messages = require('../../../utils/messages'),
  router = require('express').Router(),
  validator = require('validator'),
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
        res.status(400).json(beautify(err));
      });
  })


  .post('/', function (req, res) {

    var userData = req.body;

    if (!userData) {
      res.status(400)
        .json({
          message: messages.userDataMissing
        });
        return;
    }
    // TODO: validate userData !!!

    data.users
      .save(userData)
      .then(function (savedUser) {
        res.status(201)
          .json(savedUser);
      })
      .catch(function (err) {
        res.status(400).json(beautify(err));
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
        res.status(400).json(beautify(err));
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