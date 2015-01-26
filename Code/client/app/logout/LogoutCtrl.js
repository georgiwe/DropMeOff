angular.module('tripRouletteApp')
  .controller('LogoutCtrl', ['auth', 'alert', function (auth, alert) {
    auth.logout();
    alert('success', 'Logged out', 'You are now logged out');
  }]);