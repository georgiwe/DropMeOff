var mongoose = require('mongoose');
var Users = mongoose.model('User');
var Promise = require('bluebird');

function find (id) {
	var promise = new Promise(function (resolve, reject) {
		Users.findById(id, function (err, user) {
			if (err) {
				reject(err);
				return;
			}

			resolve(user);
		});
	});

	return promise;
}

function delById (id) {

}

function all () {
	var promise = new Promise(function (resolve, reject) {
		Users.find({}, function (err, users) {
			if (err) {
				reject(err);
				return;
			}

			resolve(users);
		});
	});
}

function add (userData) {
	var promise = new Promise(function (resolve, reject) {
		var user = new Users(userData);
		user.save(function (err, savedUser) {
			if (err) {
				reject(err);
				return;
			}

			resolve(savedUser);
		});
	});

	return promise;
}

module.exports = {
	repoName: 'users',
	dataAccess: {
		add: add,
		find: find,
		all: all,
		deleteById: delById
	}
};