var beautify = require('../../../utils/error-beautifier'),
  messages = require('../../../utils/messages'),
  router = require('express').Router(),
  validate = require('../../../utils/validator'),
  jwt = require('../../../utils/jwt'),
  secret = process.env.SECRET,
  modelUtils = require('../../../utils/model-utils');

module.exports = function (data) {

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

  .post('/', validate.user.allData, function (req, res) {
    var hadErrors = handleErrors(req.validationErrors(), res);

    if (hadErrors) {
      return;
    }

    var cleanUser = modelUtils.userToSafeInObj(req.body);
    cleanUser.password = req.body.password;
    cleanUser.username = req.body.username;

    data.users
      .save(cleanUser)
      .then(function (savedUser) {
        var safeUser = savedUser.toOutObj();
        safeUser.username = savedUser.username;
      
        var token = jwt.getToken(req.hostname, safeUser, secret);

        return res.status(201)
          .json({
            user: safeUser,
            token: token
          });
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.databaseError(err));
      });
  })


  .put('/:id', function (req, res) {
    if (!req.params.id) {
      return res.status(404).json({
        message: messages.userNotFound
      });
    }
    
    var userData = modelUtils.userToSafeInObj(req.body);
    userData.id = req.params.id;

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


  .post('/login', validate.user.loginData, function (req, res) {
    var hadErrors = handleErrors(req.validationErrors(), res);
    if (hadErrors) return;

    var username = req.body.username,
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

function handleErrors(rawErrors, res) {
  if (rawErrors) {
    var errors = beautify.validationError(rawErrors);
    res.status(400).json(errors);
    return true;
  }
  return false;
}