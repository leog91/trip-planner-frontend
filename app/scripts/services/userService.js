



'use strict';

angular.module('tripplannerApp')
    .service('userService', function () {

        var auth = {};

        var country = "ARS";

        var bundle = {};

        return {


            setCountry: function (newCountry) {
                country = newCountry;
            },

            getCountry: function () {
                return country;
            },



        };
    });


