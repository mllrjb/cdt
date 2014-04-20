'use strict';

angular.module('cdtApp')
  .filter('pad', function () {
    return function (input, padding) {
      padding = padding || (input + '').length;
      return(1e4 + input + '').slice(-padding)
    };
  });
