var messages = require('../../../utils/messages');
var router = require('express').Router();

module.exports = function (data) {
	router
	.get('/', function (req, res) {
		data.users
		.all()
		.then(function (users) {
			res.json(users);
		}, function (err) {
			res.status(400)
			.json({
				message: messages.genericError
			});
		});
	})
	.post('/register', function (req, res) {
		var userData = req.body;

		if (!userData) {
			res.status(400)
			.json({
				message: messages.userDataMissing
			});
		}
		// TODO: validate userData !!!

		data.users
		.add(userData)
		.then(function (savedUser) {
			res.status(201)
			.json(savedUser);
		}, function (err) {
			res.status(400)
			.json({
				message: messages.userNotRegistered
			});
		});
	})
	.post('/login', function (req, res) {
		
	});

	return router;
};