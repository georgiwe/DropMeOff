angular.module('tripRouletteApp')
  .factory('User', ['$resource', function ($resource) {
    var User = $resource('/api/users/:id', {id: '@id'}, {});
    return User;
}]);