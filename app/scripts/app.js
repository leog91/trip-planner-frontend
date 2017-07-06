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
    'ng',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngFlash',
    'angularBootstrapMaterial',
    'socialLogin'
  ])
  //angular 1.6 route fix
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])

  .config(function (socialProvider) {
    socialProvider.setGoogleKey("15090035877-h3c92ambrt0b7fk31ksfubkedr3faor3.apps.googleusercontent.com");
  })



  //datePicker Config
  .config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {

      var format = 'YYYY-MM-DD';

      if ((navigator.language || navigator.userLanguage) === 'es_ES') {
        format = 'DD-MM-YYYY';
      }
      else {
        format = 'MM-DD-YYYY';
        format = 'DD-MM-YYYY';
      }
      return moment(date).format(format);
    };
  })



  .run(function ($rootScope, $location, userService) {
    $rootScope.$on('$routeChangeStart', function (event) {
      if (!userService.isLoggedIn()) {
        console.log('DENY');
        $location.path('/login');
      }
      else {
        console.log('ALLOW');
      }
    });


  })



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
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl',
        controllerAs: 'history'
      })
      .when('/trip', {
        templateUrl: 'views/trip.html',
        controller: 'TripCtrl',
        controllerAs: 'trip'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



