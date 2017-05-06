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



        $scope.myDate = new Date();

        $scope.category = "General";

        $scope.saveItem = function () {
            if (isValid()) {
                save();
            }
        }

        $scope.categories = [
            { name: 'General' },
            { name: 'Food' },
            { name: 'Lodging' }
        ];

        $scope.item = {
            name: "",
        }

        function isValid() {
            return ($scope.item.name != "" && $scope.item.ammount != null);
        }


        function save() {
            $scope.item.category = $scope.category;
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
        }
    });

