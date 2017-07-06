



'use strict';

angular.module('tripplannerApp')
    .service('itemService', function (validator, userService, Flash, apiService) {

        var item = {
            name: "",
            ammount: "",
            date: new Date(),
            category: "General",
            currency: "",
        };

        var id = null;

        var isEdit = false;


        return {

            getIsEdit: function () {
                return isEdit;
            },

            getId: function () {
                return id;
            },

            clear: function () {
                id = null;
                item.name = "";
                item.ammount = "";
                item.date = new Date();
                item.category = "General";
            },

            save: function (itemC) {

                item = itemC;
                item.currency = userService.getProfile().currentCurrency;

                if (this.isValid()) {
                    apiService.saveItem(item)
                        .then(function (response) {
                            var message = '<strong>Well done!</strong>Item added  successfully.';
                            Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                        },
                        function (error) {
                            var message = '<strong>Ups!</strong> Try again.';
                            Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                        });
                }
            },

            withName: function (name) {
                item.name = name;
            },

            get: function () {
                return item;
            },

            clearEdit: function () {
                isEdit = false;
            },

            setId: function (id) {
                id = id;
                isEdit = true;
                apiService.itemById(id)
                    .then(function (response) {
                        item = response.data;
                        var plusOne = new Date(item.date);
                        plusOne.setDate(plusOne.getDate() + 1);
                        item.date = plusOne;
                    },
                    function (error) {
                        console.log("get itemById fail");
                    });
            },

            withAmount: function (amount) {
                item.ammount = amount;
            },

            withDate: function (date) {
                item.date = date;
            },

            isValid: function () {
                return (this.isValidName()) &&
                    (this.isValidPrice())
            },

            update: function (itemC) {

                item = itemC;
                item.currency = userService.getProfile().currentCurrency;

                if (this.isValid()) {
                    apiService.updateItem(item)
                        .then(function (response) {
                            var message = '<strong>Well done!</strong> Item  edited successfully.';
                            Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                        },
                        function (error) {
                            var message = '<strong>Ups!</strong> Try again.';
                            Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                        });
                }
            },


            isValidDate: function () {
                return validator.checkDate(item.date);
            },

            isValidName: function () {
                console.log(item.name);
                return validator.minimunLength(1, item.name, "Item name")
            },

            isValidPrice: function () {
                return validator.checkPrice(item.ammount, "Price");
            },


        };
    });


