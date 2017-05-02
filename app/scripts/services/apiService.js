

'use strict';

angular.module('tripplannerApp')
    .service('apiService', function ($http) {

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
                return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "/";
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


