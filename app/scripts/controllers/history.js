'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('HistoryCtrl', function ($scope, apiService) {



        apiService.getItems(2).then(function (response) {
            var jsonBundle = response.data;
            $scope.items = jsonBundle;
        },
            function (error) {
                console.log("getBundleFail");
            });


        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
