'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('HistoryCtrl', function ($scope, apiService, userService, $window, Flash, $timeout, validator, item) {

        var today = new Date();
        $scope.dateFrom = today;
        $scope.dateTo = today;

        $scope.category = "General";

        $scope.amount = 0;
        $scope.currency = userService.getProfile().currentCurrency;

        $scope.items = userService.getHistory();
        userService.clearHistory();

        var lastRequest = "";



        /* validate
        $scope.minDateTo = new Date(
            $scope.dateFrom.getFullYear(),
            $scope.dateFrom.getMonth(),
            $scope.dateFrom.getDate()
          );
        
        
        $scope.maxDateFrom = new Date(
            $scope.dateTo.getFullYear(),
            $scope.dateTo.getMonth(),
            $scope.dateTo.getDate()
          );
        */
        $scope.deleteItem = function (index) {
            console.log(index);
            console.log($scope.items[index]);
            var id = $scope.items[index].id;

            apiService.deleteItem(id).then(function (response) {
                console.log("ok");
                $scope.items.splice(index, 1);
                var message = '<strong>Well done!</strong> Item  deleted successfully.';
                Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);

                sumOnDelete();





            }, function (error) {
                console.log("nope");
                var message = '<strong>Ups!</strong> Try again.';
                Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
            });
        };


        $scope.editItem = function (index) {
            var id = $scope.items[index].id;
            //$window.location.href = '/#/editItem/' + id;
            item.setId(id);
            $window.location.href = '/#/addItem/';
        };



        //function isCategoryValid() {return ($scope.item.name != null && $scope.item.ammount != null);        }


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
            } else {
                //var message = '<strong>Ups!</strong> Invalid date range.';
                //Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
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
            /*
            console.log($scope.dateFrom);
            console.log($scope.dateTo);
            return ($scope.dateFrom > $scope.dateFrom);
*/
            //return true;
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




        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
