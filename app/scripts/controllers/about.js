'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
  .controller('AboutCtrl', function ($scope, apiService) {



 //   var userNameWithoutMail = dataService.getUser().email.slice(0, dataService.getUser().email.indexOf("@"));
   // $scope.userName = userNameWithoutMail;




    var myDate = new Date();
    //this.isOpen = false;



    $scope.day = myDate.getDate();
    $scope.month = myDate.getMonth();
    $scope.year = myDate.getFullYear();


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
