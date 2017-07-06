'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('HistoryCtrl', function ($scope, apiService, userService, $window, Flash, $timeout, validator, itemService) {

        var today = new Date();
        $scope.dateFrom = today;
        $scope.dateTo = today;

        $scope.category = "General";

        $scope.amount = 0;
        $scope.currency = userService.getProfile().currentCurrency;
        var lastRequest = "";

        if (userService.hasTrip()) {

            $scope.items = userService.getHistory();
            $scope.dateFrom = userService.getDateFrom();
            $scope.dateTo = userService.getDateTo();
            lastRequest = "findBetweenDates";

            apiService.getBetweenDatesSum($scope.dateFrom, $scope.dateTo).then(function (response) {
                $scope.amount = response.data;
            },
                function (error) {
                    console.log("getBundle SUM Fail");
                });
        }


        userService.clearHistory();




        $scope.deleteItem = function (index) {
            var id = $scope.items[index].id;
            apiService.deleteItem(id).then(function (response) {
                $scope.items.splice(index, 1);
                var message = '<strong>Well done!</strong> Item  deleted successfully.';
                Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                sumOnDelete();
            }, function (error) {
                var message = '<strong>Ups!</strong> Try again.';
                Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
            });
        };

        $scope.editItem = function (index) {
            var id = $scope.items[index].id;
            itemService.setId(id);
            $window.location.href = '/#/addItem/';
        };

        $scope.byCategory = function () {
            apiService.byCategory($scope.category).then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
                lastRequest = "byCategory";
            },
                function (error) {
                    console.log("getBundleFail");
                });
            apiService.byCategorySum($scope.category).then(function (response) {
                $scope.amount = response.data;
            },
                function (error) {
                    console.log("getBundle SUM Fail");
                });
        };

        $scope.showAll = function () {
            apiService.getItems().then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
                lastRequest = "showAll";
            },
                function (error) {
                    console.log("getBundleFail");
                });
            apiService.getItemsSum().then(function (response) {
                $scope.amount = response.data;
            },
                function (error) {
                    console.log("getBundle SUM Fail");
                });
        };

        $scope.addItem = function () {
            $window.location.href = '/#/addItem/';
        }

        $scope.betweenDates = function () {
            if (isValidBetweenDates()) {
                findBetweenDates();
            }
        };

        function findBetweenDates() {
            apiService.getBetweenDates($scope.dateFrom, $scope.dateTo).then(function (response) {
                var jsonBundle = response.data;
                $scope.items = jsonBundle;
                lastRequest = "findBetweenDates";
            },
                function (error) {
                    console.log("getBundleFail");
                });
            apiService.getBetweenDatesSum($scope.dateFrom, $scope.dateTo).then(function (response) {
                $scope.amount = response.data;
            },
                function (error) {
                    console.log("getBundle SUM Fail");
                });
        };

        function isValidBetweenDates() {
            return validator.checkDateRange($scope.dateFrom, $scope.dateTo);
        };

        function sumOnDelete() {
            if (lastRequest == "byCategory") {
                apiService.byCategorySum($scope.category).then(function (response) {
                    $scope.amount = response.data;
                },
                    function (error) {
                        console.log("getBundle SUM Fail");
                    });
            }
            if (lastRequest == "showAll") {
                apiService.getItemsSum().then(function (response) {
                    $scope.amount = response.data;
                },
                    function (error) {
                        console.log("getBundle SUM Fail");
                    });
            }
            if (lastRequest == "findBetweenDates") {
                apiService.getBetweenDatesSum($scope.dateFrom, $scope.dateTo).then(function (response) {
                    $scope.amount = response.data;
                },
                    function (error) {
                        console.log("getBundle SUM Fail");
                    });
            }
        };

        $scope.preset = [
            "General",
            "Food",
            "Lodging"
        ];

        $scope.categories = $scope.preset.concat(userService.getProfile().categories);


    });
