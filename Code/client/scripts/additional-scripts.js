(function () {
  var $wrapper = $('#wrapper');
  var $window = $(window);
  var windowHeight;
  $window.on('resize', resizeToFit);
  resizeToFit();

  function resizeToFit() {
    windowHeight = $window.height();
    $wrapper.css({
      height: windowHeight
    });
  }
})()