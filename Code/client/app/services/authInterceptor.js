angular.module('tripRouletteApp')
  .factory('authInterceptor', ['tokenService', function (tokenService) {
    return {
      request: function (config) {
        var token = tokenService.getToken();
        
        if (token)
          config.headers.Authorization = 'Bearer ' + token;
        
        return config;
      },
      response: function (response) {
        return response;
      }
    };
  }]);