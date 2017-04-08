'use strict';

/**
 * @ngdoc overview
 * @name tripplannerApp
 * @description
 * # tripplannerApp
 *
 * Main module of the application.
 */
angular
  .module('tripplannerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
//angular 1.6 route fix
  .config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/addItem', {
        templateUrl: 'views/addItem.html',
        controller: 'AddItemCtrl',
        controllerAs: 'addItem'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/converter', {
        templateUrl: 'views/converter.html',
        controller: 'ConvertCtrl',
        controllerAs: 'converter'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



