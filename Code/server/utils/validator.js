var constants = require('./constants');

function validateUserData(req, res, next) {

  // First Name validations
  req.assert('firstName', 'The First Name field is required').notEmpty();
  req.assert('firstName', 'The First Name field must be between ' + constants.userNames.MAX_LENGTH + ' and ' + constants.userNames.NAMES_MAX_LENGTH + ' characters long').len(constants.userNames.MIN_LENGTH, constants.userNames.MAX_LENGTH);

  // Last Name validations
  req.assert('firstName', 'The Last Name field is required').notEmpty();
  req.assert('firstName', 'The Last Name field must be between ' + constants.userNames.MIN_LENGTH + ' and ' + constants.userNames.MAX_LENGTH + ' characters long').len(constants.userNames.MIN_LENGTH, constants.userNames.MAX_LENGTH);

  // Email validations
  req.assert('email', 'The Email field is required').notEmpty();
  req.assert('email', 'Please enter a valid email').isEmail();

  // Username validations
  req.assert('username', 'The Username field is required').notEmpty();
  req.assert('username', 'The Username must be between ' + constants.username.MIN + ' and ' + constants.username.MAX + ' characters long').len(constants.username.MIN, constants.username.MAX);

  // Password validations
  req.assert('password', 'The Password must be between ' + constants.password.MIN + ' and ' + constants.password.MAX + ' characters long').len(constants.password.MIN, constants.password.MAX);
  
  // Driver validations
  req.assert('isDriver', 'The Is Driver field is required').notEmpty();
  if (req.body.isDriver) {
    req.assert('carModel', 'Drivers must supply a car make/model').notEmpty();
  }
  
  next();
}

function validateUpdateUserData(req, res, next) {

  console.log('inside update validation');

  next();
}

module.exports = {
  user: {
    data: validateUserData,
    update: validateUpdateUserData
  }
};