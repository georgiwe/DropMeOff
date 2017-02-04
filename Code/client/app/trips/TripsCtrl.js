angular.module('tripRouletteApp')
.controller('TripsCtrl', ['$scope', 'Trip', 'alert', 'auth', function ($scope, Trip, alert, auth) {

  $scope.user = auth.getUser();

  Trip.query(function (data) {
    $scope.paging = {
      totalItems: data.length,
      currPage: 1,
      maxSize: 10,
      rotate: false,
      numPerPage: 15,
      numPages: Math.ceil(data.length / $scope.paging.numPerPage)
    };

    $scope.trips = data.slice(0, $scope.paging.numPerPage);

    $scope.$watch('paging.currPage', function () {
      var startInd = ($scope.paging.currPage - 1) * $scope.paging.numPerPage;
      var endInd = startInd + $scope.paging.numPerPage;
      $scope.trips = data.slice(startInd, endInd);
    });
  }, function (err) {
    alert('danger', err.data.message, err.data.details);
  });

  $scope.evalDate = function (dateStr) {
    return (new Date()).addHours(1.5) >= new Date(dateStr);
  }
}]);
