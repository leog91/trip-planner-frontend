



'use strict';

angular.module('tripplannerApp')
    .service('userService', function () {

        var auth = {};

        var bundle = {};

        var email = "";

        var name = "";

        var imageUrl = "";

        var profile = {};

        var isLogged = false;

        var history = {};

        var dateFrom = null;
        var dateTo = null;

        var hasTrip = false;


        return {

            setProfile: function (user) {
                profile = user;
            },

            getProfile: function () {
                return profile;
            },

            clearHistory: function () {
                history = {};
                hasTrip = false;
                dateFrom = null;
                dateTo = null;
            },

            setHistory: function (items) {
                history = items;
                hasTrip = true;
            },

            hasTrip: function () {
                return hasTrip;
            },

            getHistory: function () {
                return history;
            },


            setHistoryDates: function (dateFFrom, dateTTo) {
                var plusOne = new Date(dateFFrom);
                plusOne.setDate(plusOne.getDate() + 1);
                dateFrom = plusOne;

                plusOne = new Date(dateTTo);
                plusOne.setDate(plusOne.getDate() + 1);
                dateTo = plusOne;
            },


            setUser: function (user) {
                email = user.email.slice(0, user.email.indexOf("@"));
                name = user.name;
                imageUrl = user.imageUrl;
                isLogged = true;
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


            getDateFrom: function () {
                return dateFrom;
            },

            getDateTo: function () {
                return dateTo;
            },
            setCountry: function (newCountry) {
                country = newCountry;
            },

            getCountry: function () {
                return country;
            },



            isLoggedIn: function () {
                return isLogged;
            },

            logOut: function () {
                email = "";
                name = "";
                imageUrl = "";
                isLogged = false;
            },

        };
    });


