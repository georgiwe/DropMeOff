module.exports = function (app, data) {
	var routersData = require('./create_routers')(data);

	for (var i = 0, len = routersData.length; i < len; i += 1) {
		app.use(routersData[i].route, routersData[i].router);
	};
}