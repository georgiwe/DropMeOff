var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

var reposPath = path.resolve(__dirname + '/repositories') + '/';
var fileNames = fs.readdirSync(reposPath);

var data = {};

for (var i = 0, len = fileNames.length; i < len; i += 1) {
  var repo = require(reposPath + fileNames[i]);
  data[repo.repoName] = repo.dataAccess;
};

data.connectToDb = function (connStr) {
  mongoose.connect(connStr);
  var connection = mongoose.connection;

  connection.on('error', function (err) {
    console.log('Database connection error:');
    console.log(err);
  });

  connection.once('open', function () {
    console.log('Connection to database established.');
  });
}

module.exports = data;