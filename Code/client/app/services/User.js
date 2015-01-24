angular.module('tripRouletteApp')
  .factory('User', ['$resource', 'API_URL', function ($resource, API_URL) {
    var User = $resource(API_URL + '/users/:id', {
      id: '@id'
    }, {
      login: {
        method: 'POST',
        url: API_URL + '/users/login'
      },
      update: {
        method: 'PUT'
      }
    });
    return User;
}]);