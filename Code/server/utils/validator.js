var constants = require('./constants'),
  beautify = require('./error-beautifier');

function validateUsername(req, usingEmailOverride) {
  // Username
  req.assert('username', 'The Username field is required').notEmpty();
  req.assert('username', 'The Username must be between ' +
      constants.username.MIN + ' and ' +
      constants.username.MAX + ' characters long')
    .len(constants.username.MIN, usingEmailOverride || constants.username.MAX);
}

function validateFirstName(req) {
  // First Name
  req.assert('firstName', 'The First Name field is required').notEmpty();
  req.assert('firstName', 'The First Name field must be between ' +
      constants.userNames.MIN + ' and ' +
      constants.userNames.MAX + ' characters long')
    .len(constants.userNames.MIN, constants.userNames.MAX);
}

function validateLastName(req) {
  // Last Name
  req.assert('firstName', 'The Last Name field is required').notEmpty();
  req.assert('firstName', 'The Last Name field must be between ' +
      constants.userNames.MIN + ' and ' +
      constants.userNames.MAX + ' characters long')
    .len(constants.userNames.MIN, constants.userNames.MAX);
}

function validateEmail(req) {
  // Email
  req.assert('email', 'The Email field is required').notEmpty();
  req.assert('email', 'Please enter a valid email').isEmail();
}

function validatePassword(req) {
  // Password
  req.assert('password', 'The Password field is required').notEmpty();
  req.assert('password', 'The Password must be between ' +
      constants.password.MIN + ' and ' +
      constants.password.MAX + ' characters long')
    .len(constants.password.MIN, constants.password.MAX);
}

function validateDriverData(req) {
  // Driver
  req.sanitize('isDriver', 'The Is Driver field is required').toBoolean();
  if (req.body.isDriver) {
    req.assert('carModel', 'Drivers must supply a car make/model').notEmpty();
  } else {
    req.body.carModel = undefined;
  }
}

module.exports = {
  user: {
    allData: validateAllUserData,
    loginData: validateLoginData,
    updateData: validateUserUpdateData
  }
};

function validateAllUserData(req, res, next) {
  validateFirstName(req);
  validateLastName(req);
  validateEmail(req);
  validateUsername(req);
  validatePassword(req);
  validateDriverData(req);

  handleErrors(req, res, next);
}

function validateUserUpdateData(req, res, next) {
  validateFirstName(req);
  validateLastName(req);
  validateEmail(req);
  validatePassword(req);
  validateDriverData(req);

  handleErrors(req, res, next);
}

function validateLoginData(req, res, next) {
  validateUsername(req, 30);
  validatePassword(req);

  handleErrors(req, res, next);
}

function handleErrors(req, res, next) {
  var rawErrors = req.validationErrors();

  if (rawErrors) {
    var errors = beautify.validationError(rawErrors);
    res.status(400).json(errors);
  } else {
    next();
  }
}