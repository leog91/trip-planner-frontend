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
    .controller('LoginCtrl', function ($scope, $rootScope) {



        $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {

            console.log(userDetails);
            
            /*
            dataService.userSave(userDetails);
            var userName = dataService.getUser().email;
            userService.get(userName).then(function (response) {
                console.log("get ok");
                $window.location.href = '/#/home';
            },
                function (error) {
                    console.log("user not found")
                    userService.saveDto(userName).then(function (response) {
                        console.log("get createdDto ok");
                        $window.location.href = '/#/editProfile';
                    },
                        function (error) {
                            console.log("create userDto fail");
                        });

                    ;


                });*/
        });












        /*
        
                $scope.logggin = function () {
        
                    authService.login();
                    console.log(localStorage);
                };
        */


    });