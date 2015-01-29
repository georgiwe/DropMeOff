angular.module('tripRouletteApp')
  .factory('Trip', ['$resource', 'API_URL', function ($resource, API_URL) {
    var Trip = $resource(API_URL + '/trips/:id', {
      id: '@id'
    }, {
      join: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      }
    });
    return Trip;
  }]);