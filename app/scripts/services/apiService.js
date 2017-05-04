

'use strict';

angular.module('tripplannerApp')
    .service('apiService', function ($http, userService) {

        var auth = {};

        var country = "ARS";

        var bundle = {};

        var currentGroupSize = 0;

        return {


            url: function () {
                //
                return "http://localhost:8080/";
            },

            userEmail: function () {
                //tt
                return "leog91@gmail.com";
            },

            groupSize: function () {
                //tt
                return currentGroupSize;
            },

            setGroupSize: function (groupSize) {
                currentGroupSize = groupSize;
            },


            /*            saveItem: function (item) {
                            return $http({
                                method: 'post',
                                url: this.url() + "items",
                                data: item
                            });
                        },
            */
            saveItem: function (item, date) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/add/" + this.userEmail() + "/" + this.dateUrl(date) + this.itemUrl(item) + "/" + this.groupSize()
                });
            },

            //
            itemUrl: function (item) {
                return item.name + "/" + item.ammount + "/" + item.currency + "/" + item.category
            },

            dateUrl: function (date) {
                return date.getDate() + "/" + (date.getMonth() + + 1) + "/" + date.getFullYear() + "/";
            },


            getItems: function (userEmail) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/user/" + userEmail
                });
            },

            getBetweenDates: function (dateFrom, dateTo) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/betweendates/" + "email" + "/" + this.dateUrl(dateFrom) + this.dateUrl(dateTo)
                });
            },

            getCountry: function () {
                return country;
            },


            saveSettings: function (countryCode, groupSize) {
                return $http({
                    method: 'get',
                    url: this.url() + "user/saveSettings/" + userService.getEmail() + "/" + countryCode + "/" + groupSize
                });
            },


            addRatio: function () {
                return $http({
                    method: 'post',
                    url: this.url() + "currency/add/20/4/2017/USD/ARS/16"
                });
            },

            getProfile: function () {
                return $http({
                    method: 'get',
                    url: this.url() + "user/read/" + userService.getEmail()
                });
            },

            logIn: function () {
                return $http({
                    method: 'get',
                    url: this.url() + "user/logIn/" + userService.getEmail()
                });
            },



        };
    });


