'use strict';

angular.module('cdtApp')
  .controller('RunCtrl', function ($scope, $stateParams) {
    $scope.time = Date.create($stateParams.time);
    if ($scope.time === Date.NaN) {
      // TODO: show invalid state
    }
    $scope.millis = $scope.time.getTime();
    $scope.isFuture = $scope.time.isFuture();
    $scope.isPast = $scope.time.isPast();
  });
