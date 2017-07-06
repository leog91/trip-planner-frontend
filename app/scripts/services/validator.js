



'use strict';

angular.module('tripplannerApp')
    .service('validator', function (Flash) {


        return {


            minimunLength: function (n, prop, msg) {
                return (this.checkNull(prop, msg)) && (this.checkLength(n, prop, msg));
            },


            checkSelectors: function (prop1, prop2) {
                if (this.checkSelector(prop1) && this.checkSelector(prop2)) {
                    return true
                } else {
                    var message = '<strong>Ups!</strong> must select a country .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    return false;
                }
            },


            checkSelector: function (prop) {
                return prop != null && prop != undefined && prop != "";
            },


            checkNull: function (prop, msg) {
                if (prop != null) {
                    return true;
                } else {
                    var message = '<strong>Ups!</strong>' + msg + ' must be atleast 2 char long .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    return false;
                }
            },

            checkLength: function (n, prop, msg) {
                if (prop.length > n) {
                    return true;
                } else {
                    var message = '<strong>Ups!</strong>' + msg + ' must be atleast 2 char long .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    return false;
                }
            },

            checkPrice: function (price, msg) {
                if ((price != null) && !(price === "")) {
                    return true;
                } else {
                    var message = '<strong>Ups!</strong>' + msg + ' must have a value .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    return false;
                }
            },

            checkDateRange: function (date1, date2) {
                if (date1 <= date2) {
                    return true;
                } else {
                    var message = '<strong>Ups!</strong> Date range is invalid .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    return false;
                }
            }

        };
    });


