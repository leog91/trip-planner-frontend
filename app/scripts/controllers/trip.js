'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('TripCtrl', function ($scope, apiService, $window, Flash, userService, validator) {


        apiService.getTrips().then(function (response) {
            var jsonBundle = response.data;
            $scope.trips = jsonBundle;
        },
            function (error) {
                console.log("get Trips Fail");
            });

        var today = new Date();
        $scope.dateFrom = today;
        $scope.dateTo = today;

        $scope.saveTrip = function () {
            if (isValid()) {
                save();
            }
        }

        function isValid() {
            return validator.minimunLength(1, $scope.name, " Name") &&
                validator.minimunLength(1, $scope.info, " Info") &&
                validator.checkDateRange($scope.dateFrom, $scope.dateTo);
        }

        $scope.showAll = function () {
            apiService.getTrips().then(function (response) {
                var jsonBundle = response.data;
                $scope.trips = jsonBundle;
            },
                function (error) {
                    console.log("get Trips Fail");
                });
        };


        $scope.deleteTrip = function (index) {
            var id = $scope.trips[index].id;

            apiService.deleteTrip(id).then(function (response) {
                console.log("ok");
                $scope.trips.splice(index, 1);
                var message = '<strong>Well done!</strong> Trip  deleted successfully.';
                Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
            }, function (error) {
                console.log("nope");
                var message = '<strong>Ups!</strong> Try again.';
                Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
            });
        };

        $scope.viewTrip = function (index) {
            var id = $scope.trips[index].id;

            apiService.readTripItems(id).then(function (response) {
                console.log("ok");
                userService.setHistory(response.data);
                userService.setHistoryDates($scope.trips[index].dateFrom, $scope.trips[index].dateTo);

                var message = '<strong>Well done!</strong> Viewing Trip.';
                Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                $window.location.href = '/#/history/';

            }, function (error) {
                console.log("nope");
                var message = '<strong>Ups!</strong> Try again.';
                Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
            });
        };

        function save() {
            apiService.saveTrip($scope.dateFrom, $scope.dateTo, $scope.name, $scope.info)
                .then(function (response) {
                    $scope.name = "";
                    $scope.info = "";
                    var message = '<strong>Well done!</strong>Trip added  successfully.';
                    Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    apiService.getTrips().then(function (response) {
                        var jsonBundle = response.data;
                        $scope.trips = jsonBundle;
                    },
                        function (error) {
                            console.log("get Trips Fail");
                        });
                },
                function (error) {
                    console.log("add Trip Fail");
                });
        }

    });
