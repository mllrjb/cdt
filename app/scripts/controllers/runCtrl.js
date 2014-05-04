'use strict';

angular.module('cdtApp')
  .controller('RunCtrl', ['$scope', '$stateParams', 'localStorageService',
    function ($scope, $stateParams, localStorageService) {
    $scope.time = Date.create($stateParams.time);
    if ($scope.time === Date.NaN) {
      // TODO: show invalid state
    }
    $scope.millis = $scope.time.getTime();
    $scope.isFuture = $scope.time.isFuture();
    $scope.isPast = $scope.time.isPast();

    // default backgrounds
    $scope.backgrounds = [
      '../images/mountains.jpg'
    ];

    var urls = localStorageService.get('urls');
    if (urls && urls.length) {
      $scope.backgrounds = urls.split('\n');
    }
  }]);
