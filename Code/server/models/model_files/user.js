var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  roles = require('../../utils/roles'),
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

// password setter
function hashPassword(password) {
  var saltBytes = crypto.randomBytes(128);
  var hashedPasswordBytes = crypto.pbkdf2Sync(password, saltBytes, ITERATIONS, BYTE_LENGTH);

  this.salt = saltBytes.toString(STRING_ENCODING);
  return hashedPasswordBytes.toString(STRING_ENCODING);
}

function validateNameLength(value) {
  var len = value ? value.length : 0;
  return len >= 3 && len <= 20;
}

function saveLowercase(rawUsername) {
  // sets the lowercase username and returns rawUsername 
  // so the username field will be set the way the user chose
  this.usernameLowercase = rawUsername;
  return rawUsername;
}

// validations
userSchema.path('firstName').validate(validateNameLength, 'Invalid first name length');
userSchema.path('lastName').validate(validateNameLength, 'Invalid last name length');

userSchema.path('carModel').validate(function (value) {
  if (this.isDriver) {
    var len = value ? value.length : 0;
    return len >= 3 && len <= 30;
  }
}, 'Invalid car model length');

userSchema.path('carModel').validate(function (value) {
  if (value && !this.isDriver) {
    return false;
  }

  return true;
}, 'Non-drivers can not have cars');

mongoose.model('User', userSchema);