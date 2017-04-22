

'use strict';

angular.module('tripplannerApp')
    .service('apiService', function ($http) {

        var auth = {};

        var country = "ARS";

        var bundle = {};

        return {


            url: function () {
                //
                return "http://localhost:8080/";
            },

            saveItem: function (item) {
                return $http({
                    method: 'post',
                    url: this.url() + "items",
                    data: item
                });
            },

            getItems: function (id) {
                return $http({
                    method: 'get',
                    url: this.url() + "items"
                });
            },

            getCountry: function () {
                return country;
            },

            addRatio: function () {
                return $http({
                    method: 'post',
                    url: this.url() + "currency/add/20/4/2017/USD/ARS/16"
                });
            },




        };
    });


