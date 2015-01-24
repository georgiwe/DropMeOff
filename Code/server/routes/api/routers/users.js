module.exports = function (data) {
  var beautify = require('../../../utils/error-beautifier'),
    messages = require('../../../utils/messages'),
    router = require('express').Router(),
    validate = require('../../../utils/validator'),
    jwt = require('../../../utils/jwt'),
    secret = process.env.SECRET,
    modelUtils = require('../../../utils/model-utils');

  router

    .get('/', function (req, res) {

    data.users.all()
      .then(function (users) {
        return res.json(users);
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.databaseError(err));
      });
  })


  .post('/', validate.user.data, function (req, res) {
    var rawErrors = req.validationErrors();

    if (rawErrors) {
      var errors = beautify.validationError(rawErrors);
      return res.status(400).json(errors);
    }

    data.users
      .save(req.body)
      .then(function (savedUser) {
        var token = jwt.getToken(req.hostname, savedUser.toOutObj(), secret);

        return res.status(201)
          .json({
            user: savedUser,
            token: token
          });
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.databaseError(err));
      });
  })


  .put('/:id', function (req, res) {

    var userData = modelUtils.userToSafeObj(req.body);
    userData._id = req.params.id;

    if (userData.isDriver) {
      if (!userData.carModel) {
        return res.status(400).json({
          message: messages.missingCarModel
        });
      }
    } else {
      userData.carModel = undefined;
    }

    data.users
      .update(userData)
      .then(function (updatedUser) {
        return res.json(updatedUser);
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.databaseError(err));
      });
  })


  .post('/login', function (req, res) {
    var username = req.body.username.toLowerCase(),
      password = req.body.password;

    data.users
      .findByUsername(username, true)
      .then(function (user) {

        if (!user.passMatches(password)) {
          return res.status(401)
            .json({
              message: messages.wrongLoginCredentials
            });
        }

        var token = jwt.getToken(req.hostname, user.toOutObj(), secret);

        return res.json({
          token: token
        });
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.customError(err));
      });
  })






  // NOT IMPLEMENTED
  // NOT IMPLEMENTED
  // NOT IMPLEMENTED
  .get('/:id', function (req, res) {
    req.status(500)
      .json({
        message: 'Not implemented'
      });
  });

  return router;
};