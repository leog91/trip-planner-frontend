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
        $scope.category = "General";



        $scope.deleteItem = function (index) {
            console.log(index);
            console.log($scope.items[index]);
            var id = $scope.items[index].id;

            apiService.deleteItem(id).then(function (response) {
                console.log("ok");
            }, function (error) {
                console.log("nope");
            });
        };




        $scope.byCategory = function () {
            apiService.byCategory($scope.category).then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
            },
                function (error) {
                    console.log("getBundleFail");
                });
        };



        $scope.showAll = function () {
            apiService.getItems().then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
            },
                function (error) {
                    console.log("getBundleFail");
                });
        };



        $scope.betweenDates = function () {

            apiService.getBetweenDates($scope.dateFrom, $scope.dateTo).then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
            },
                function (error) {
                    console.log("getBundleFail");
                });
        };


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
