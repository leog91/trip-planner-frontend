'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('AddItemCtrl', function ($scope, userService, Flash, apiService, $timeout, item) {


        $scope.isEdit = item.getIsEdit();
        $scope.isAdd = !(item.getIsEdit());

        $scope.item = {};


        apiService.getProfile().then(function (response) {
            $scope.item = item.get();
        }, function (error) {
            console.log("conection error");
        });

        item.clear();
        item.clearEdit();

        $scope.saveItem = function () {
            item.save($scope.item);
        }

        $scope.updateItem = function () {
            item.update($scope.item);
        }

        $scope.preset = [
            "General",
            "Food",
            "Lodging"
        ];

        $scope.categories = $scope.preset.concat(userService.getProfile().categories);



    });

