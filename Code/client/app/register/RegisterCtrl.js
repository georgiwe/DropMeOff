angular.module('tripRouletteApp')
  .controller('RegisterCtrl', ['$scope', 'User', 'alert', '$state',
    function ($scope, User, alert, $state) {
      $scope.submit = function () {
        var userData = $scope.newUser;

        var registeredUser = User.save(userData, function () {
          registeredUser.email = 'email@email.email';
          registeredUser.$save();
        });
      };
      //      $scope.submit = function () {
      //        alert('success', 'Good!', '<ul><li>one thing<li><li>another thing<li></ul>');
      //
      //        $state.go('home');
      //      };
}]);