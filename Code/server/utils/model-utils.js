var _ = require('underscore');

module.exports = {
  userToSafeObj: userToSafeObj
};

function userToSafeObj(user) {
  return _.omit(user, 'password', 'username', 'usernameLowercase', 'salt', 'role');
}