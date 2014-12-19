module.exports = function (data) {
	var baseApiUrl = '/api/';

	return [{
		router: require('./routers/users')(data),
		route: baseApiUrl + 'users'
	}];
}