var ColorApp = angular.module('colorApp', []);

ColorApp.filter('percent', function() {
  return function(number) {
    //TODO: check if it's really a number
    return number + '%';
  };
});

ColorApp.filter('integer', function() {
  return function(number) {
    return parseInt(number, 10);
  };
});

ColorApp.controller('PageCtrl', function($scope) {
  function trans(domain, range) {
    var domainLength = Math.abs(domain[1] - domain[0]);
    var rangeLength = Math.abs(range[1] - range[0]);
    return function(rawNumber) {
      var ratio = Math.abs(rawNumber - domain[0]) / domainLength;
      if(rawNumber > domain[1]) {
        return range[1];
      }

      if(rawNumber < domain[0]) {
        return range[0];
      }

      return rangeLength * ratio + range[0];
    };
  }

  window.addEventListener('deviceorientation', function(event) {
    $scope.$apply(function() {
      $scope.lightness = 50;
      $scope.saturation = trans([-80, 20], [0, 100])(event.beta);
      $scope.hue = trans([-30, 30], [0, 360])(event.gamma);
    });
  }, true);

});
