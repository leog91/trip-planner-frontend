



'use strict';

angular.module('tripplannerApp')
    .service('item', function (validator, userService, Flash, apiService) {

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

            setId: function (id) {
                id = id;
                isEdit = true;
                apiService.itemById(id)
                    .then(function (response) {
                        console.log("get itemid ok")
                        item = response.data;
                        item.date = new Date(item.date.year, item.date.monthOfYear - 1, item.date.dayOfMonth);
                        //$scope.category = $scope.item.category;
                    },
                    function (error) {
                        console.log("get item fail");
                    });

            },

            getIsEdit: function () {
                return isEdit;
            },


            getId: function () {
                return id;
            },

            clear: function () {
                id = null;
                //  isEdit = false;
                item.name = "";
                item.ammount = "";
                item.date = new Date();
                item.category = "General";
            },

            save: function (itemC, date) {

                item.currency = userService.getProfile().currentCurrency;
                item.name = itemC.name;
                item.ammount = itemC.ammount;
                item.date = date;
                item.category = itemC.category;

                if (this.isValid()) {
                    apiService.saveItem(item, item.date)
                        .then(function (response) {
                            console.log("addItem OK");
                            var message = '<strong>Well done!</strong>Item added  successfully.';
                            Flash.create('success', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                        },
                        function (error) {
                            console.log("addItem Fail");
                            var message = '<strong>Ups!</strong> Try again.';
                            Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                        });
                }
            },

            /*
                        isEdit: function () {
                            return id != null;
                        },
            */
            withName: function (name) {
                item.name = name;
            },


            /*
            get: function () {
                if (this.isEdit()) {
                    return item;
                }
                else {
                    // this.clear();
                    return item;
                }

            },
*/
            get: function () {
                return item;
            },

            clearEdit: function () {
                isEdit = false;
            },

            withAmount: function (amount) {
                item.ammount = amount;
            },

            withDate: function (date) {
                item.date = date;
            },

            isValid: function () {

                // return true;

                return (this.isValidName()) &&
                    //(this.isValidDate()) &&

                    (this.isValidPrice())

            },


            update: function (itemC, date, idd) {

                item.currency = userService.getProfile().currentCurrency;
                item.name = itemC.name;
                item.ammount = itemC.ammount;
                item.date = date;
                item.category = itemC.category;

                if (this.isValid()) {
                    apiService.updateItem(item, item.date, idd)
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


