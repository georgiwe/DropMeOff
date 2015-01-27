var _ = require('underscore');

module.exports = {
  userToSafeInObj: userToSafeInObj,
  tripToSafeObj: tripToSafeObj
};

function userToSafeInObj(user) {
  return _.omit(user, 'password', 'username', 'usernameLowercase', 'salt', 'role');
}

function tripToSafeObj(trip) {
  return _.omit(trip, 'driver', 'passengers');
}