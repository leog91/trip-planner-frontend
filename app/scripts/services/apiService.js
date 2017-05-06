

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
                    url: this.url() + "item/add/" + userService.getEmail() + "/" + this.dateUrl(date) + this.itemUrl(item) + "/" + this.groupSize()
                });
            },

            //
            itemUrl: function (item) {
                return item.name + "/" + item.ammount + "/" + item.currency + "/" + item.category
            },

            dateUrl: function (date) {
                return date.getDate() + "/" + (date.getMonth() + + 1) + "/" + date.getFullYear() + "/";
            },


            getItems: function () {
                return $http({
                    method: 'get',
                    url: this.url() + "item/user/" + userService.getEmail()
                });
            },

            getBetweenDates: function (dateFrom, dateTo) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/betweendates/" + userService.getEmail() + "/" + this.dateUrl(dateFrom) + this.dateUrl(dateTo)
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



            coefByCodeAndDate: function (date, code) {
                return $http({
                    method: 'get',
                    url: this.url() + "currency/coef/" + code + "/" + this.dateUrl(date)
                });
            },





        };
    });


