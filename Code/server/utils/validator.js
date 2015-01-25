var constants = require('./constants');

function validateUsername(req) {
  // Username
  req.assert('username', 'The Username field is required').notEmpty();
  req.assert('username', 'The Username must be between ' + constants.username.MIN + ' and ' + constants.username.MAX + ' characters long').len(constants.username.MIN, constants.username.MAX);
}

function validateFirstName(req) {
  // First Name
  req.assert('firstName', 'The First Name field is required').notEmpty();
  req.assert('firstName', 'The First Name field must be between ' + constants.userNames.MAX_LENGTH + ' and ' + constants.userNames.NAMES_MAX_LENGTH + ' characters long').len(constants.userNames.MIN_LENGTH, constants.userNames.MAX_LENGTH);
}

function validateLastName(req) {
  // Last Name
  req.assert('firstName', 'The Last Name field is required').notEmpty();
  req.assert('firstName', 'The Last Name field must be between ' + constants.userNames.MIN_LENGTH + ' and ' + constants.userNames.MAX_LENGTH + ' characters long').len(constants.userNames.MIN_LENGTH, constants.userNames.MAX_LENGTH);
}

function validateEmail(req) {
  // Email
  req.assert('email', 'The Email field is required').notEmpty();
  req.assert('email', 'Please enter a valid email').isEmail();
}

function validatePassword(req) {
  // Password
  req.assert('password', 'The Password field is required').notEmpty();
  req.assert('password', 'The Password must be between ' + constants.password.MIN + ' and ' + constants.password.MAX + ' characters long').len(constants.password.MIN, constants.password.MAX);
}

function validateDriverData(req) {
  // Driver
  req.sanitize('isDriver', 'The Is Driver field is required').toBoolean();
  if (req.body.isDriver) {
    req.assert('carModel', 'Drivers must supply a car make/model').notEmpty();
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

  next();
}

function validateUserUpdateData(req, res, next) {
  validateFirstName(req);
  validateLastName(req);
  validateEmail(req);
  validatePassword(req);
  validateDriverData(req);

  next();
}

function validateLoginData(req, res, next) {
  validateUsername(req);
  validatePassword(req);
  
  next();
}