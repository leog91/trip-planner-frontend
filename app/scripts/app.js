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
    //'ngTouch',
    'ngMaterial',
    'angularBootstrapMaterial',
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
      //if (document.documentElement.lang === 'en_US') {
        
      //}
      return moment(date).format(format);
    };
  })




  .run(function ($rootScope, $location, userService) {



    $rootScope.$on('$routeChangeStart', function (event) {

      if (!userService.isLoggedIn()) {
        console.log('DENY');
        //  event.preventDefault();
        //alert("Hello! You must loggIn!");
        $location.path('/login');
      }
      else {
        console.log('ALLOW');
        // $location.path('/home');
      }
    });


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
      .otherwise({
        redirectTo: '/'
      });
  });



