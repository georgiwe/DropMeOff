angular.module('tripRouletteApp')
  .controller('RegisterCtrl', ['$scope', 'User',
    function ($scope, User) {
      $scope.submit = function () {
        var userData = $scope.newUser;
        User.save(userData, function (response, headers) {
          console.log('created');
        });
      };
}]);