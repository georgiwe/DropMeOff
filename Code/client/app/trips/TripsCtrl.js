angular.module('tripRouletteApp')
  .controller('TripsCtrl', ['$scope', 'Trip', 'alert', function ($scope, Trip, alert) {
    Trip.query(function (data) {
      $scope.trips = data;
    }, function (err) {
      alert('danger', err.data.message, err.data.details);
    });
  }]);