'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    //.controller('LoginCtrl', function ($scope, authService) {
    .controller('LoginCtrl', function ($scope, $rootScope, userService, apiService, $window, $location) {



        $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {

            console.log(userDetails);

            userService.setUser(userDetails);

            apiService.logIn().then(function (response) {
                console.log("user exist");

                apiService.getProfile().then(function (response) {
                    userService.setProfile(response.data);
                })


                $window.location.href = '/#/main';
            },
                function (error) {
                    console.log("creating user");
                    $window.location.href = '/#/settings';
                });

            console.log(userService.getEmail());



        })
        $scope.signout = function () {
            socialLoginService.logout();
        }

        $scope.$on('event:social-sign-out-success', function (event, userDetails) {
            $scope.result = userDetails;
        })









        /*
        
                $scope.logggin = function () {
        
                    authService.login();
                    console.log(localStorage);
                };
        */


    });