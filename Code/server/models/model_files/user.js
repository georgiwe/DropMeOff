var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String
    minke
  },
  lastName: String,
  username: String,
});

mongoose.model('User', userSchema);