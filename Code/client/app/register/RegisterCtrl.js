angular.module('tripRouletteApp')
  .controller('RegisterCtrl', ['$scope', 'User', 'alert', '$state', 'tokenService',
    function ($scope, User, alert, $state, tokenService) {
      $scope.submit = function () {
        var userData = $scope.newUser;

        User.save(userData, function (response) {
          alert('success', 'Registered!', 'Welcome to trip roulette!');
          tokenService.setToken(response.token);
          $state.go('home');
        }, function (err) {
//          var details = err.data.details ? err.data.details.join('. ') : '';
//          var seconds = err.data.details.length > 6 ? 6 : err.data.details.length;
          alert('danger', err.data.message, err.data.details);
        });
      };
}]);