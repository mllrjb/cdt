'use strict';

angular.module('cdtApp')
  .constant('bgImgSliderConfig', {
    delay: 5000
  })
.directive('bgImgSlider', ['bgImgSliderConfig', '$interval',
  function (globalConfig, $interval) {
    return {
      restrict: 'EA',
      scope: {
        backgrounds: '=bgImgSlider',
        delay: '@'
      },
      templateUrl: 'partials/bgImgSlider.html',
      transclude: true,
      link: function ($scope, element, attrs) {
        $scope.currentIndex = -1;
        $scope.delay = $scope.delay || globalConfig.delay;

        if ($scope.backgrounds && $scope.backgrounds.length > 1) {
          $interval(function() {
            increment();
          }, $scope.delay);
        }

        increment();

        /**
         * Increment the background index, wrapping if we've reached the end
         * of the list.
         */
        function increment() {
          $scope.currentIndex++;
          $scope.currentIndex = $scope.currentIndex % $scope.backgrounds.length;
        }

      }
    };
  }
]);
