angular.module('tripRouletteApp')
  .controller('RegisterCtrl', ['$scope', 'User', 'alert',
    function ($scope, User, alert, $state) {
      $scope.submit = function () {
        var userData = $scope.newUser;

        var registeredUser = User.save(userData, function () {
          alert('success', 'Registered!', 'Welcome to trip roulette!');
        }, function (err) {
          var details = err.data.details ? err.data.details.join('. ') : '';
          alert('danger', err.data.message, details, 5000);
        });
      };
      //      $scope.submit = function () {
      //        alert('success', 'Good!', '<ul><li>one thing<li><li>another thing<li></ul>');
      //
      //        $state.go('home');
      //      };
}]);