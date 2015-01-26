var secret = process.env.SECRET,
  utilsRoute = '../../../../utils/',
  beautify = require(utilsRoute + 'error-beautifier'),
  modelUtils = require(utilsRoute + 'model-utils'),
  messages = require(utilsRoute + 'messages'),
  jwt = require(utilsRoute+ 'jwt');

function handleErrors(rawErrors, res) {
  if (rawErrors) {
    var errors = beautify.validationError(rawErrors);
    res.status(400).json(errors);
  }
  return !!rawErrors;
}

module.exports = function (data) {

  function getAll(req, res) {
    data.users.all()
      .then(function (users) {
        return res.json(users);
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.databaseError(err));
      });
  }

  function register(req, res) {
    var hadErrors = handleErrors(req.validationErrors(), res);
    if (hadErrors) return;

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
  }

  function update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        message: messages.invalidUserId
      });
    }

    var hadErrors = handleErrors(req.validationErrors(), res);
    if (hadErrors) return;

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
  }

  function login(req, res) {
    var hadErrors = handleErrors(req.validationErrors(), res);
    if (hadErrors) return;

    var username = req.body.username;
    var password = req.body.password;

    data.users
      .findByUsernameOrEmail(username, true)
      .then(function (user) {

        if (!user || !user.passMatches(password)) {
          return res.status(401)
            .json({
              message: messages.wrongLoginCredentials
            });
        }

        var safeUser = user.toOutObj();
        safeUser.username = user.username;
        var token = jwt.getToken(req.hostname, safeUser, secret);

        return res.json({
          user: safeUser,
          token: token
        });
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.customError(err));
      });
  }

  return {
    getAll: getAll,
    register: register,
    update: update,
    login: login,
  };

};