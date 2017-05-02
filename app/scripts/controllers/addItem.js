'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('AddItemCtrl', function ($scope, userService, apiService) {



        $scope.test = "bind";
        $scope.myDate = new Date();

        apiService.getItems().then(function (response) {

            $scope.items = response.data;

            console.log("getItems Ok");
        },
            function (error) {
                console.log("getItemsFail");
            });

        //$$phase

        /*if (!$scope.$$phase) {
            //
            $digest
            //or 
            //$apply
        }*/
        $scope.item = {
            name: "baseName",
            ammount: 0,
            price: "",
            currency: "",
            category: "general"
        }



        $scope.addCurrency = function () {
            apiService.addRatio();

        };

        /*
                $scope.saveItem = function () {
                    $scope.item.currency = userService.getCountry();
                    console.log("fn test");
        
                    apiService.saveItem($scope.item)
                        .then(function (response) {
                            console.log("addItem OK");
                        },
                        function (error) {
                            console.log("addItem Fail");
                        });
                    console.log($scope.item);
        
                };
        */

        $scope.saveItem = function () {
            $scope.item.currency = userService.getCountry();
            console.log("fn test");

            apiService.saveItem($scope.item, $scope.myDate)
                .then(function (response) {
                    console.log("addItem OK");
                },
                function (error) {
                    console.log("addItem Fail");
                });
            console.log($scope.item);

        };

    });


