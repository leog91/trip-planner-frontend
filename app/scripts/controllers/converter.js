'use strict';




angular.module('tripplannerApp')
    .controller('ConvertCtrl', function ($scope, $http, apiService, validator) {


        $scope.date = new Date();

        $scope.dateFrom = $scope.date;
        $scope.dateTo = $scope.date;

        $scope.loadRatio = 1;

        $scope.convert = function () {
            if (validator.checkSelectors($scope.countryFrom, $scope.countryTo)) {
                apiService.getRatio($scope.date, $scope.countryFrom, $scope.countryTo)
                    .then(function (response) {
                        $scope.ratio = response.data;
                    },
                    function (error) {
                        console.log("getRatio fail");
                    });
            }
        };


        $scope.addRatio = function () {
            if (validator.checkSelectors($scope.countryFrom, $scope.countryTo)) {
                apiService.setRatio($scope.dateFrom, $scope.dateTo, $scope.countryFrom, $scope.countryTo, $scope.loadRatio)
                    .then(function (response) {
                        $scope.ratio = response.data.ratio;
                    },
                    function (error) {
                        console.log("getRatio fail");
                    });
            }
        };



        $scope.countries = [

            { name: 'Argentina', code: 'ARS' },
            { name: 'Australia', code: 'AUD' },
            { name: 'Bolivia', code: 'BOB' },
            { name: 'Brazil', code: 'BRL' },
            { name: 'Canada', code: 'CAD' },
            { name: 'Chile', code: 'CLP' },
            { name: 'China', code: 'CNY' },
            { name: 'Norway', code: 'NOK' },
            { name: 'Paraguay', code: 'PYG' },
            { name: 'Peru', code: 'PEN' },
            { name: 'Portugal', code: 'EUR' },
            { name: 'Russian Federation', code: 'RUB' },
            { name: 'Spain', code: 'EUR' },
            { name: 'Sweden', code: 'SEK' },
            { name: 'Switzerland', code: 'CHF' },
            { name: 'Turkey', code: 'TRY' },
            { name: 'United Kingdom', code: 'GBP' },
            { name: 'United States', code: 'USD' },
            { name: 'Uruguay', code: 'UYU' },
            { name: 'Venezuela', code: 'VEF' },
            { name: 'Zimbabwe', code: 'ZWL' }
        ];


    });