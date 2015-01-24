angular.module('tripRouletteApp')
  .controller('LogoutCtrl', ['tokenService', '$state', 'alert',
    function (tokenService, $state, alert) {
      tokenService.removeToken();
      alert('success', 'Logged out', 'You are now logged out');
      $state.go('home');
  }]);