angular.module('tripRouletteApp')
  .factory('User', ['$resource', 'API_URL', function ($resource, API_URL) {
    var User = $resource(API_URL + '/users/:id', {id: '@_id'}, {});
    return User;
}]);