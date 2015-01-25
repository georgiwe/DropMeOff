var _ = require('underscore');

module.exports = {
  userToSafeInObj: userToSafeInObj,
};

function userToSafeInObj(user) {
  return _.omit(user, 'password', 'username', 'usernameLowercase', 'salt', 'role');
}