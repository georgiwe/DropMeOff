require('../models');
var data = require('../data');
data.connectToDb('mongodb://localhost/tripRoulette');

module.exports = data;