angular.module('tripRouletteApp')
  .controller('LoginCtrl', ['$scope', 'User', 'alert', 'tokenService', '$state',
    function ($scope, User, alert, tokenService, $state) {
      $scope.submit = function () {
        User.login($scope.user, function (data) {
          tokenService.setToken(data.token);
          alert('success', 'Logged In', 'You have logged in successfully');
          $state.go('home');
        }, function (err) {
          alert('danger', err.data.message, err.data.details.join('. '));
        });
      }
  }]);