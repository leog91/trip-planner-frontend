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

        $scope.dateFrom = new Date();
        $scope.dateTo = new Date();



        $scope.showAll = function () {
            apiService.getItems(2).then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
            },
                function (error) {
                    console.log("getBundleFail");
                });
        };



        $scope.betweenDates = function () {

            //if(dateFrom < dateTo)
            apiService.getBetweenDates($scope.dateFrom,$scope.dateTo).then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
            },
                function (error) {
                    console.log("getBundleFail");
                });
        };




        //$scope.category = "General";
        $scope.categories = [
            { name: 'General' },
            { name: 'Food' },
            { name: 'Lodging' }
        ];






        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
