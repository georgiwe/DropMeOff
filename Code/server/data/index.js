var fs = require('fs');
var path = require('path');

var reposPath = path.resolve(__dirname + '/repositories') + '/';
var fileNames = fs.readdirSync(reposPath);

var data = {};

for (var i = 0, len = fileNames.length; i < len; i += 1) {
	var repo = require(reposPath + fileNames[i]);
	data[repo.name] = repo.dataAccess;
};

module.exports = data;