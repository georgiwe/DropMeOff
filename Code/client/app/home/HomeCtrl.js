angular.module('tripRouletteApp')
  .controller('HomeCtrl', ['$scope', 'auth',
    function ($scope, auth) {
      var user = auth.getUser();
      $scope.isAuthenticated = auth.isAuthenticated;
      $scope.name = user ? user.firstName : undefined;
}]);