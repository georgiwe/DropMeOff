var secret = process.env.SECRET,
  utilsRoute = '../../../../utils/',
  beautify = require(utilsRoute + 'error-beautifier'),
  modelUtils = require(utilsRoute + 'model-utils'),
  messages = require(utilsRoute + 'messages'),
  jwt = require(utilsRoute + 'jwt');

function getLoginOutputData(userData, tokenIssuer) {
  var safeUser = userData.toOutObj();
  safeUser.username = userData.username;
  var token = jwt.getToken(tokenIssuer, safeUser, secret);

  return {
    user: safeUser,
    token: token
  };
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
    var cleanUser = modelUtils.userToSafeInObj(req.body);
    cleanUser.password = req.body.password;
    cleanUser.username = req.body.username;

    data.users
      .save(cleanUser)
      .then(function (savedUser) {
        var outputData = getLoginOutputData(savedUser, req.hostname);
        return res.status(201).json(outputData);
      })
      .catch(function (err) {
        return res.status(400).json(beautify.databaseError(err));
      });
  }

  function update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        message: messages.invalidUserId
      });
    }

    var userData = modelUtils.userToSafeInObj(req.body);
    userData.id = req.params.id;

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
    var outputData = getLoginOutputData(req.user, req.hostname);
    res.json(outputData);
  }

  function getById(req, res) {
    var id = req.params.id;
    if (!id) return res.json({
      message: messages.invalidUserId
    });

    data.users.findById(id)
      .then(function (user) {
        if (!user) {
          res.status(400).json({
            message: messages.userNotFound
          });
        }
        res.json(user.toOutObj());
      })
      .catch(function (err) {
        res.status(500).json(beautify.databaseError(err));
      });
  }

  return {
    register: register,
    getById: getById,
    getAll: getAll,
    update: update,
    login: login,
  };
};