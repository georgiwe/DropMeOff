var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: String,
	lastName: String,
	username: String,
});

mongoose.model('User', userSchema);