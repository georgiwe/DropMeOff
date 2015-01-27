angular.module('tripRouletteApp')
  .controller('RegisterCtrl', ['$scope', 'User', 'alert', 'auth',
    function ($scope, User, alert, auth) {
      $scope.submit = function () {
        if ($scope.register.$invalid) {
          alert('danger', 'Invalid data');
          return;
        }
        
        var userData = $scope.newUser;

        User.save(userData, function (data) {
          alert('success', 'Registered!', 'Welcome to trip roulette!');
          auth.login(data.user, data.token);
        }, function (err) {
          alert('danger', err.data.message, err.data.details);
        });
      };
}]);