// Inside a self-invoking function, 
// so the add/remove tooltip functions
// do not get created on each 
// instantiation of the directive

(function () {
  angular.module('tripRouletteApp')
    .directive('errorTooltip', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var target = $(element)
            .parents('form')
            .find('[name=' + attrs.target + ']');

          target.on('input', function () {
            if (element.children().length) {
              var msg = element.children().first().text();
              var placement = element.attr('data-placement') || 'top';
              addTooltip(target, msg, placement);
              element.children().first().hide();
            } else {
              removeTooltip(target);
            }
          });
        }
      };
    });

  function addTooltip(target, msg, placement) {
    target
      .attr('data-toggle', 'tooltip')
      .attr('title', msg)
      .attr('data-original-title', msg)
      .attr('data-placement', placement)
      .tooltip('show');
  }

  function removeTooltip(target) {
    target
      .removeAttr('data-toggle')
      .removeAttr('title')
      .removeAttr('data-original-title')
      .tooltip('hide');
  }
})();