angular.module('tripRouletteApp')
  .factory('alert', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
      return function (type, title, message, timeout) {
        var timer;

        $rootScope.alert = {
          hasBeenShown: true,
          show: true,
          type: type,
          message: message,
          title: title
        };
        
        $timeout.cancel(timer);
        timer = $timeout(function () {
          $rootScope.alert.show = false;
        }, timeout || 2500);
      };
  }]);