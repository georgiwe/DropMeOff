angular.module('tripRouletteApp')
  .factory('userStore', ['$window', function ($window) {
    var storage = $window.localStorage,
      USER = 'user',
      cachedUser;

    return {
      store: function (user) {
        cachedUser = user;
        storage.setItem(USER, JSON.stringify(user));
      },
      get: function () {
        if (!cachedUser) {
          cachedUser = JSON.parse(storage.getItem(USER));
        }
        
        return cachedUser;
      },
      remove: function () {
        storage.removeItem(USER);
        cachedUser = undefined;
      }
    };
  }]);