var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  modelUtils = require('../../utils/model-utils'),
  constants = require('../../utils/constants'),
  bcrypt = require('bcrypt-nodejs'),
  CAR_MODEL_MIN = constants.carModel.MIN, 
  CAR_MODEL_MAX = constants.carModel.MAX,
  USERNAME_MIN = constants.username.MIN,
  USERNAME_MAX = constants.username.MAX,
  NAMES_MIN = constants.userNames.MIN,
  NAMES_MAX = constants.userNames.MAX;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    require: 'First Name is required',
    trim: true,
    set: setTitleCase
  },
  lastName: {
    type: String,
    required: true,
    require: 'Last Name is required',
    trim: true,
    set: setTitleCase
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
    set: setPasswordAndSalt
  },
  salt: {
    type: String,
    requird: true,
    select: false
  },
  roles: {
    type: Array,
    trim: true,
    enum: constants.roles.all,
    default: constants.roles.default,
    select: false
  },
  isDriver: {
    type: Boolean,
    default: false
  },
  carModel: {
    type: String,
  },
  interestCities: {
    type: [String],
    set: allToTitleCase
  },
  created: {
    type: Date,
    default: new Date(),
    select: false
  }
}, {
  autoIndex: true,
  strict: true
});

function allToTitleCase(arr) {
  for (var i = 0, l = arr.length; i < l; i += 1) {
    arr[i] = arr[i].toTitleCase();
  }
  return arr;
}

function setPasswordAndSalt(password) {
  this.salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, this.salt);
}

function validateNameLength(value) {
  var len = value ? value.length : 0;
  return len.isBetween(NAMES_MIN, NAMES_MAX, true); //isBetween(len, constants.userNames.MIN, constants.userNames.MIN);
}

function saveLowercase(rawUsername) {
  // sets the lowercase username and returns rawUsername 
  // so the username field will be set the way the user chose
  this.usernameLowercase = rawUsername;
  return rawUsername;
}

function validateUsernameLength(value) {
  var len = value ? value.length : 0;
  return len.isBetween(USERNAME_MIN, USERNAME_MAX, true);
}

function setTitleCase(name) {
  return name.toTitleCase();
}

// validations
userSchema.path('firstName').validate(validateNameLength, 'Invalid first name length');
userSchema.path('lastName').validate(validateNameLength, 'Invalid last name length');
userSchema.path('username').validate(validateUsernameLength, 'Invalid username length');

userSchema.path('carModel').validate(function (value) {
  if (this.isDriver) {
    var len = value ? value.length : 0;
    return len.isBetween(CAR_MODEL_MIN, CAR_MODEL_MAX, true); //isBetween(len, constants.carModel.MIN, constants.carModel.MIN);
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
  return modelUtils.userToSafeInObj(this.toObject());
}

userSchema.methods.passMatches = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', userSchema);