module.exports = function (data) {
	var baseApiUrl = '/api/';

	return [{
		router: require('./routers/users')(data),
		route: baseApiUrl + 'users'
	}, {
		router: require('./routers/trips')(data),
		route: baseApiUrl + 'trips'
	}, {
		router: require('./routers/cities'),    
		route: baseApiUrl + 'cities'
	}, {
		router: require('./routers/stats')(data),
		route: baseApiUrl + 'stats'
	}];
}