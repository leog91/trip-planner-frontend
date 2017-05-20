'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('EditItemCtrl', function ($scope, userService, $routeParams, Flash, apiService) {



        var itemId = $routeParams.id;

        apiService.itemById(itemId)
            .then(function (response) {
                console.log("get itemid ok")
                $scope.item = response.data;
                $scope.myDate = new Date($scope.item.date.year, $scope.item.date.monthOfYear - 1, $scope.item.date.dayOfMonth);
                $scope.category = $scope.item.category;
            },
            function (error) {
                console.log("get item fail");
            });





        $scope.updateItem = function () {
            if (isValid()) {
                update();
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

     

        function isValid() {
            return ($scope.item.name != null && $scope.item.ammount != null);
        }


        function update() {
            $scope.item.category = $scope.category;
            $scope.item.currency = userService.getCountry();
            console.log("fn test");

            apiService.updateItem($scope.item, $scope.myDate, itemId)
                .then(function (response) {
                    var message = '<strong>Well done!</strong> Item  edited successfully.';
                    Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                },
                function (error) {
                    var message = '<strong>Ups!</strong> Try again.';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                });
            console.log($scope.item);
        }
    });

