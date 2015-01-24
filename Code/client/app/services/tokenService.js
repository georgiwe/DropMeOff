angular.module('tripRouletteApp')
  .factory('tokenService',['$window', function ($window) {
    var TOKEN = 'token';
    var storage = $window.localStorage;
    var cachedToken;

    return {
      setToken: setToken,
      getToken: getToken,
      removeToken: removeToken,
      isAuthenticated: isAuthenticated
    };

    function setToken(token) {
      cachedToken = token;
      storage.setItem(TOKEN, token);
    }

    function getToken() {
      if (!cachedToken) {
        cachedToken = storage.getItem(TOKEN);
      }

      return cachedToken;
    }

    function isAuthenticated() {
      return !!getToken();
    }

    function removeToken() {
      storage.removeItem(TOKEN);
      cachedToken = undefined;
    }
  }]);