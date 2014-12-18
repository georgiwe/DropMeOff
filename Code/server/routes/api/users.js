module.exports = function (data) {
	var express = require('express');
	var router = express.Router();

	router.get('/', function (req, res) {

		console.log('inside GET api/users');

		res.json({
			people: ['pesho', 'gosho']
		});

		// data.users.all()
		// 	.then(function (users) {
		// 		res.json(users);
		// 	}, function (err) {
		// 		res.status(400);
		// 	});
});

	return router;
};