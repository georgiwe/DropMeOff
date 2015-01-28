var constants = require('../../utils/constants'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Trip = mongoose.model('Trip'),
  Promise = require('bluebird');

function getTopDrivers(count) {
  count = count || constants.TOP_DRIVERS_COUNT;
  var promise = new Promise(function (resolve, reject) {
    User.find()
      .where('isDriver').equals(true)
      .limit(count)
      .exec(function (err, drivers) {
        if (err) reject(err);
        else resolve(drivers);
      });
  });
  return promise;
}

module.exports = {
  repoName: 'stats',
  dataAccess: {
    topDrivers: getTopDrivers
  }
};