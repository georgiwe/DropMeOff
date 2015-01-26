var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Promise = require('bluebird'),
  messages = require('../../utils/messages'),
  _ = require('underscore');

function findById(id) {
  var promise = new Promise(function (resolve, reject) {
    User.findById(id, function (err, user) {
      if (err) reject(err);
      else resolve(user);
    });
  });

  return promise;
}

function all() {
  var promise = new Promise(function (resolve, reject) {
    User.find({}, function (err, users) {
      if (err) reject(err);
      else resolve(users);
    });
  });

  return promise;
}

function save(userData) {
  var promise = new Promise(function (resolve, reject) {
    var user = new User(userData);
    user.save(function (err, savedUser) {
      if (err) reject(err);
      else resolve(savedUser);
    });
  });

  return promise;
}

function update(userData) {
  var promise = new Promise(function (resolve, reject) {
    User.findById(userData.id, function (err, user) {
      if (err) reject(err);

      if (!user) {
        reject({
          message: messages.userNotFound
        });
        return;
      }

      _.extend(user, userData);

      user.save(function (err, savedUser) {
        if (err) reject(err);
        else resolve(savedUser);
      });
    });
  });

  return promise;
}

function findByUsernameOrEmail(lookFor, auth) {
  var promise = new Promise(function (resolve, reject) {
    var lowercase = lookFor.toLowerCase();
    var query = User.findOne().or([{
      usernameLowercase: lowercase
    }, {
      email: lowercase
    }]);

    if (auth) {
      query.select('+password +salt');
    }

    query.exec(function (err, user) {
      if (err) reject(err);
      resolve(user);
    });
  });

  return promise;
}

function delById(id) {

}

module.exports = {
  repoName: 'users',
  dataAccess: {
    save: save,
    findById: findById,
    all: all,
    deleteById: delById,
    update: update,
    findByUsernameOrEmail: findByUsernameOrEmail
  }
};