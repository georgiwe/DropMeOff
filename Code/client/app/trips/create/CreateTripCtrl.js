angular.module('tripRouletteApp')
.controller('CreateTripCtrl', ['$scope', 'Trip', '$http', 'alert', function ($scope, Trip, $http, alert) {
  $http.get('/api/cities')
  .then(function (cities) {
    $scope.cities = cities.data;
  })
  .catch(function (err) {
    alert('danger', err.data.message, err.data.details);
  });

  $scope.trip = {
    departure: new Date().addHours(1)
  };
  $scope.dateFormat = 'dd-MMMM-yyyy HH:mm';
  $scope.opened = false;
  $scope.minDate = new Date();

  $scope.dateOptions = {
    showWeeks: false,
    startingDay: 1
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.submit = function () {
    Trip.save($scope.trip, function (data) {
      console.log(data);
    }, function (error) {
      alert('danger', error.data.message, error.data.details)
    });
  }
}]);