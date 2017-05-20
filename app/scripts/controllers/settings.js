'use strict';

/**
 * @ngdoc function
 * @name tripplannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tripplannerApp
 */
angular.module('tripplannerApp')
    .controller('SettingsCtrl', function ($scope, Flash, apiService, userService) {

        $scope.category = "Category";

        $scope.saveSettings = function () {

            apiService.saveSettings($scope.country, $scope.groupSize)
                .then(function (response) {
                    console.log("save ok");
                    var message = '<strong>Well done!</strong>Settings saved.';
                    Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    apiService.getProfile().then(function (response) {
                        userService.setProfile(response.data);
                    })
                },
                function (error) {
                    var message = '<strong>Ups!</strong> Try again .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    console.log("save Fail");
                });
        };


        $scope.addCategory = function () {
            apiService.addCategory($scope.category)
                .then(function (response) {
                    var message = '<strong>Well done!</strong>Category added  successfully.';
                    Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    console.log("addCat ok");
                    apiService.getProfile().then(function (response) {
                        userService.setProfile(response.data);
                    })
                },
                function (error) {
                    var message = '<strong>Ups!</strong> Try again .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    console.log("addCat fail");
                });
        };







        $scope.country = userService.getProfile().currentCurrency;

        $scope.groupSize = userService.getProfile().groupSize;

        $scope.image = userService.getImage();

        $scope.name = userService.getName();

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





        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
