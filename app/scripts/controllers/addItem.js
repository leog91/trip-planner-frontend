'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('AddItemCtrl', function ($scope, userService, Flash, apiService, $timeout, itemService) {


        $scope.isEdit = itemService.getIsEdit();
        $scope.isAdd = !(itemService.getIsEdit());

        $scope.item = {};


        apiService.getProfile().then(function (response) {
            $scope.item = itemService.get();
        }, function (error) {
            console.log("conection error");
        });

        itemService.clear();
        itemService.clearEdit();

        $scope.saveItem = function () {
            itemService.save($scope.item);
        }

        $scope.updateItem = function () {
            itemService.update($scope.item);
        }

        $scope.preset = [
            "General",
            "Food",
            "Lodging"
        ];

        $scope.categories = $scope.preset.concat(userService.getProfile().categories);



    });

