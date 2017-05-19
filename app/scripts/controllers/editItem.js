'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('EditItemCtrl', function ($scope, userService, $routeParams, apiService) {


        //$scope.item = apiService.itemById(1).data;

        var itemId = $routeParams.id;

        apiService.itemById(itemId)
            .then(function (response) {
                console.log("get itemid ok")
                $scope.item = response.data;
                $scope.myDate = new Date($scope.item.date.year, $scope.item.date.monthOfYear - 1, $scope.item.date.dayOfMonth);
                $scope.category = $scope.item.category;
                //console.log($scope.item.date.year, $scope.item.monthOfYear, $scope.item.dayOfMonth);
            },
            function (error) {
                console.log("get item fail");
            });


        //$scope.myDate = new Date($scope.item.year, $scope.item.monthOfYear, dayOfMonth, 0, 0, 0, 0);



        $scope.updateItem = function () {
            if (isValid()) {
                update();
            }
        }

        $scope.preset = [
            "General",
            "Food",
            "Lodging"
        ];

        $scope.categories = $scope.preset.concat(userService.getProfile().categories);

        /*
        
                $scope.categories = [
                    { name: 'General' },
                    { name: 'Food' },
                    { name: 'Lodging' }
                ];//.push(userService.getProfile().categories);
        */

        /* $scope.item = {
             name: "",
         }*/

        function isValid() {
            return ($scope.item.name != "" && $scope.item.ammount != null);
        }


        function update() {
            $scope.item.category = $scope.category;
            $scope.item.currency = userService.getCountry();
            console.log("fn test");

            apiService.updateItem($scope.item, $scope.myDate, itemId)
                .then(function (response) {
                    console.log("addItem OK");
                },
                function (error) {
                    console.log("addItem Fail");
                });
            console.log($scope.item);
        }
    });

