angular.module('tripRouletteApp')
  .controller('HeaderCtrl', ['$scope', 'tokenService',
    function ($scope, tokenService) {
      $scope.isAuthenticated = tokenService.isAuthenticated;
  }]);