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



        $scope.item = {
            name: "baseName",
            ammount: 0,
            price: "",
            currency: "",
            category:""
        }

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


    });


