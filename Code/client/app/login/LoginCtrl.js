angular.module('tripRouletteApp')
  .controller('LoginCtrl', ['$scope', 'User', 'alert', 'auth',
    function ($scope, User, alert, auth) {
      $scope.submit = function (form) {
        if ($scope.form.$invalid) {
          alert('danger', 'Invalid data', null);
          return;
        }
        
        User.login($scope.user, function (data) {
          auth.login(data.user, data.token);
          alert('success', 'Logged In', 'You have logged in successfully');
        }, function (err) {
          if (err.status == 401) alert('danger', 'Incorrect username/email or password');
          else alert('danger', err.data.message, err.data.details);
        });
      }
  }]);