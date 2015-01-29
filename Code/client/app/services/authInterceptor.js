  angular.module('tripRouletteApp')
  .factory('authInterceptor', ['tokenService', '$q', function (tokenService, $q) {
    return {
      request: function (config) {
        var token = tokenService.getToken();
        
        if (token)
          config.headers.Authorization = 'Bearer ' + token;
        
        return config;
      },
      response: function (response) {
        return response;
      },
      responseError: function (error) {
        if (error.status === 401) {
          var message = 'You are not authorized to access this resource';
          return $q.reject({
            status: 401,
            message: message
          });
        }

        return $q.reject(error);
      }
    };
  }]);