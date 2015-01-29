angular.module('tripRouletteApp')
  .factory('alert', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
      return function (type, title, messages, timeout) {
        var message, timer;

        if (Array.isArray(messages)) {
          message = messages.join('. ');

          if (!timeout) {
            timeout = messages.length > 6 ? 6 : messages.length;
            timeout *= 1000;
            timeout = timeout < 2000 ? 2000 : timeout;
          }
        } else {
          message = messages;
        }

        $rootScope.alert = {
          hasBeenShown: true,
          show: true,
          type: type,
          message: message, // || messages,
          title: title
        };

        $timeout.cancel(timer);
        timer = $timeout(function () {
          $rootScope.alert.show = false;
        }, timeout || 3500);
      };
  }]);