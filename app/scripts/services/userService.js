



'use strict';

angular.module('tripplannerApp')
    .service('userService', function () {

        var auth = {};

        var country = "ARS";

        var bundle = {};

        var email = "";

        var name = "";

        var imageUrl = "";

        //m
        var profile = {};



        return {

            setProfile: function (user) {
                profile = user;
            },

            getProfile: function () {
                return profile;
            },


            setUser: function (user) {
                //var userNameWithoutMail = userService.getEmail().slice(0, userService.getEmail().indexOf("@"));
                //email = user.email;
                email = user.email.slice(0, user.email.indexOf("@"));
                name = user.name;
                imageUrl = user.imageUrl;
            },

            getEmail: function () {
                return email;
            },

            getName: function () {
                return name;
            },

            getImage: function () {
                return imageUrl;
            },




            setCountry: function (newCountry) {
                country = newCountry;
            },

            getCountry: function () {
                return country;
            },



        };
    });


