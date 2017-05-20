'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('AddItemCtrl', function ($scope, userService, Flash, apiService) {



        $scope.myDate = new Date();

        $scope.category = "General";

        $scope.saveItem = function () {
            if (isValid()) {
                save();
            }
            else {
                var message = '<strong>Ups!</strong> Name must be atleast 2 char long .';
                Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
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

        $scope.item = {
            name: "",
        }

        function isValid() {
            return ($scope.item.name != null && $scope.item.ammount != null);
        }


        function save() {
            $scope.item.category = $scope.category;
            $scope.item.currency = userService.getCountry();
            console.log("fn test");

            apiService.saveItem($scope.item, $scope.myDate)
                .then(function (response) {
                    console.log("addItem OK");
                    var message = '<strong>Well done!</strong>Item added  successfully.';
                    Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                },
                function (error) {
                    console.log("addItem Fail");
                    var message = '<strong>Ups!</strong> Try again.';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                });
            console.log($scope.item);
        }
    });

