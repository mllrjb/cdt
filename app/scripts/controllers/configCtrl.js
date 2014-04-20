'use strict';

angular.module('cdtApp')
  .controller('ConfigCtrl', function ($scope) {
    $scope.isTimeOpen = false;

    $scope.toggleTimeOpen = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.isTimeOpen = !$scope.isTimeOpen;
    };

    $scope.isTimePast = function() {
      return Date.create($scope.endTime).isPast();
    };
  });
