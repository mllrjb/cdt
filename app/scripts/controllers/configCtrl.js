'use strict';

angular.module('cdtApp')
  .controller('ConfigCtrl', ['$scope', 'localStorageService', function ($scope, localStorageService) {
    $scope.isTimeOpen = false;

    $scope.toggleTimeOpen = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.isTimeOpen = !$scope.isTimeOpen;
    };

    $scope.isTimePast = function() {
      return Date.create($scope.endTime).isPast();
    };

    $scope.urls = localStorageService.get('urls');

    $scope.$watch('urls', function(val) {
      localStorageService.set('urls', val);
    });
  }]);
