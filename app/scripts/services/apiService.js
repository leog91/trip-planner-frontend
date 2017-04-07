

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


            getCountry: function () {
                return country;
            },



        };
    });


