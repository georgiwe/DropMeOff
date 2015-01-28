angular.module('tripRouletteApp')
  .directive('validateEquals', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ngModelCtrl) {
        function isEqualTo(value) {
          var valid = (value === scope.$eval(attrs.validateEquals));
          ngModelCtrl.$setValidity('equal', valid);
          return valid ? value : undefined;
        }

        ngModelCtrl.$parsers.push(isEqualTo);
        ngModelCtrl.$formatters.push(isEqualTo);
        var count = 0;

        scope.$watch(attrs.validateEquals, function () {
          element.val('');
          if (element.parents('form').$dirty)
            ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });
      }
    };
  });