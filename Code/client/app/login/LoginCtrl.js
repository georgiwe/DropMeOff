angular.module('tripRouletteApp')
  .controller('LoginCtrl', ['$scope', 'User', 'alert', 'auth',
    function ($scope, User, alert, auth) {
      $scope.submit = function () {
        User.login($scope.user, function (data) {
          auth.login(data.user, data.token);
          alert('success', 'Logged In', 'You have logged in successfully');
        }, function (err) {
          alert('danger', err.data.message, err.data.details);
        });
      }
  }]);