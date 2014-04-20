'use strict';

angular.module('cdtApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'timer'
])
  .config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /config
    $urlRouterProvider.otherwise('/config');
    // Now set up the states
    $stateProvider
      .state('run', {
        url: '/run/:time',
        templateUrl: 'partials/run.html',
        controller: 'RunCtrl'
      })
      .state('config', {
        url: '/config',
        templateUrl: 'partials/config.html',
        controller: 'ConfigCtrl'
      })
  });
