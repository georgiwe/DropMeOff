var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  roles = require('../../utils/roles'),
  modelUtils = require('../../utils/model-utils'),
  _ = require('underscore'),
  constants = require('../../utils/constants'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto');

var STRING_ENCODING = 'base64';
var ITERATIONS = 10000;
var BYTE_LENGTH = 128;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    require: 'First Name is required',
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    require: 'Last Name is required',
    trim: true,
  },
  email: {
    type: String,
    required: true,
    require: 'Email is required',
    lowercase: true,
    trim: true,
    unique: true,
    match: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i
  },
  username: {
    type: String,
    required: true,
    require: 'Username is required',
    trim: true,
    set: saveLowercase
  },
  usernameLowercase: {
    type: String,
    unique: true,
    select: false,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    require: 'Password is required',
    select: false,
    set: hashPassword
  },
  salt: {
    type: String,
    requird: true,
    select: false
  },
  role: {
    type: String,
    trim: true,
    enum: roles.all,
    default: 'user',
    select: false
  },
  isDriver: {
    type: Boolean,
    default: false
  },
  carModel: {
    type: String,
  }
}, {
  autoIndex: true,
  strict: true
});

function isBetween(val, min, max) {
  return val >= min && val <= max;
}

// password setter
function hashPassword(password) {
  var salt = bcrypt.genSaltSync();
  this.salt = salt;
  return bcrypt.hashSync(password, salt);
}

function validateNameLength(value) {
  var len = value ? value.length : 0;
  return isBetween(len, constants.userNames.MIN_LENGTH, constants.userNames.MAX_LENGTH);
}

function saveLowercase(rawUsername) {
  // sets the lowercase username and returns rawUsername 
  // so the username field will be set the way the user chose
  this.usernameLowercase = rawUsername;
  return rawUsername;
}

function validateUsernameLength(value) {
  var len = value ? value.length : 0;
  return isBetween(len, constants.username.MIN, constants.username.MAX);
}

// validations
userSchema.path('firstName').validate(validateNameLength, 'Invalid first name length');
userSchema.path('lastName').validate(validateNameLength, 'Invalid last name length');
userSchema.path('username').validate(validateUsernameLength, 'Invalid username length');

userSchema.path('carModel').validate(function (value) {
  if (this.isDriver) {
    var len = value ? value.length : 0;
    return isBetween(len, constants.carModel.MIN_LENGTH, constants.carModel.MAX_LENGTH);
  }
}, 'Invalid car model length');

userSchema.path('carModel').validate(function (value) {
  if (value && !this.isDriver) {
    return false;
  }

  return true;
}, 'Non-drivers can not have cars');

// methods
userSchema.methods.toOutObj = function () {
  console.log('user.toSafeObj called');
  return modelUtils.userToSafeObj(this);
}

userSchema.methods.passMatches = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', userSchema);