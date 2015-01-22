angular.module('tripRouletteApp')
  .controller('RegisterCtrl', ['$scope', 'User', 'alert', '$state',
    function ($scope, User, alert, $state) {
//      $scope.submit = function () {
//        var userData = $scope.newUser;
//        User.save(userData, function (response, headers) {
//          console.log('created');
//        });
//      };
      $scope.submit = function () {
        alert('success', 'Good!', 'Something good just happened');
        $state.go('home');
      };
}]);