var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('underscore');

function findById(id) {
  var promise = new Promise(function (resolve, reject) {
    User.findById(id, function (err, user) {
      if (err) reject(err);
      else resolve(user);
    });
  });

  return promise;
}

function delById(id) {

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
    User.findById(userData._id, function (err, user) {
      if (err) reject(err);

      if (!user) {
        reject({
          message: 'User not found'
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

module.exports = {
  repoName: 'users',
  dataAccess: {
    save: save,
    findById: findById,
    all: all,
    deleteById: delById,
    update: update
  }
};