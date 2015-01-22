var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    trim: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isDriver: {
    type: Boolean,
    default: false
  }
}, {
  autoIndex: false
});

userSchema.path('firstName').validate(function (value) {
  var len = value.length;
  return value && len >= 3 && len <= 20;
});

// password setter

mongoose.model('User', userSchema);