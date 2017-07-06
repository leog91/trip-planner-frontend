'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('LoginCtrl', function ($scope, $rootScope, userService, socialLoginService, apiService, $window, $location) {

        userService.logOut();

        $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
            userService.setUser(userDetails);
            apiService.logIn().then(function (response) {
                apiService.getProfile().then(function (response) {
                    userService.setProfile(response.data);
                })
                $window.location.href = '/#/main';
            },
                function (error) {
                    $window.location.href = '/#/settings';
                });
        })

        $scope.signout = function () {
            socialLoginService.logout();
        }

        $scope.$on('event:social-sign-in-success', (event, userDetails) => {
            $scope.result = userDetails;
            $scope.$apply();
        })

    });