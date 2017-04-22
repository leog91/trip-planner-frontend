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
    'ngTouch',
    'socialLogin'
    //, 'auth0.lock', 'ui.router', 'angular-jwt'
  ])
  //angular 1.6 route fix
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])

  .config(function (socialProvider) {
    socialProvider.setGoogleKey("15090035877-h3c92ambrt0b7fk31ksfubkedr3faor3.apps.googleusercontent.com");
  })


  /*
    .config(function ($stateProvider, lockProvider) {
  
      $stateProvider
        .state('converter', {
          url: '/converter',
          controller: 'ConverterController',
          templateUrl: 'views/converter.html',
          controllerAs: 'vm'
        })
  
        .state('login', {
          url: '/login',
          controller: 'LoginController',
          templateUrl: 'views/login.html',
          controllerAs: 'vm'
        });
  
  
  
      lockProvider.init({
        clientID: 'fZ1cQ2XBQb7TAbydxcpzP6PsTqPcOZ6K',
        domain: 'leog91.auth0.com',
        options: {
          _idTokenVerification: false
        }
      });
  
  
    })*/



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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



