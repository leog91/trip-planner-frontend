

'use strict';

angular.module('tripplannerApp')
    .service('apiService', function ($http, userService) {

        var auth = {};

        var country = "ARS";

        var bundle = {};

        var currentGroupSize = 0;

        return {


            url: function () {
                return "http://localhost:8080/";
            },



            saveItem: function (item, date) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/add/" + userService.getEmail() + "/" + this.dateUrl(date) + this.itemUrl(item) + "/" + currentGroupSize
                });
            },

            updateItem: function (item, date, id) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/update/" + id + "/" + userService.getEmail() + "/" + this.dateUrl(date) + this.itemUrl(item) + "/" + currentGroupSize
                });
            },

            deleteItem: function (id) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/delete/" + id
                });
            },


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
            getItemsSum: function () {
                return $http({
                    method: 'get',
                    url: this.url() + "item/userSum/" + userService.getEmail() + "/" + userService.getProfile().currentCurrency
                });
            },


            getBetweenDates: function (dateFrom, dateTo) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/betweendates/" + userService.getEmail() + "/" + this.dateUrl(dateFrom) + this.dateUrl(dateTo)
                });
            },


            byCategory: function (category) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/categoryuser/" + userService.getEmail() + "/" + category
                });
            },

            getCountry: function () {
                return country;
            },


            saveSettings: function (countryCode, groupSize) {
                return $http({
                    method: 'post',
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

            addCategory: function (category) {
                return $http({
                    method: 'get',
                    url: this.url() + "user/addCategory/" + userService.getEmail() + "/" + category
                });
            },

            itemById: function (id) {
                return $http({
                    method: 'get',
                    url: this.url() + "item/readId/" + id
                });
            },

            saveTrip: function (dateFrom, dateTo, name, info) {
                return $http({
                    method: 'get',
                    url: this.url() + "trip/add/" + userService.getEmail() + "/" + this.dateUrl(dateFrom) + this.dateUrl(dateTo) + name + "/" + info
                });
            },

            getTrips: function () {
                return $http({
                    method: 'get',
                    url: this.url() + "trip/user/" + userService.getEmail()
                });
            },

            readTripItems: function (id) {
                return $http({
                    method: 'get',
                    url: this.url() + "trip/items/" + id
                });
            },


            deleteTrip: function (id) {
                return $http({
                    method: 'get',
                    url: this.url() + "trip/delete/" + id
                });
            },

        };
    });


