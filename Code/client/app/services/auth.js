angular.module('tripRouletteApp')
  .factory('auth', ['$window', 'tokenService', '$state', 'userStore', function ($window, tokenService, $state, userStore) {
    var storage = $window.localStorage;

    return {
      login: function (userData, token) {
        tokenService.setToken(token);
        userStore.store(userData);
        $state.go('home');
      },
      logout: function () {
        tokenService.removeToken();
        userStore.remove();
        $state.go('home');
      },
      isAuthenticated: function () {
        return tokenService.isAuthenticated();
      },
      getUser: function () {
        return userStore.get();
      }
    };
}]);