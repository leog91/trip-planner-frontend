



'use strict';

angular.module('tripplannerApp')
    .service('validator', function (Flash) {


        return {

            /*
        minimunLength: function (n, prop, msg) {
             console.log(prop.length > n);
             console.log(prop != null);
             console.log(
                 (
                     (prop != null)
                     &&
                     (prop.length > n)
                 )
             );
 
            if ((prop != null) && (prop.length > n)) {
                console.log(1);
                return true;
            } else {
                console.log(2);
                var message = '<strong>Ups!</strong>' + msg + ' must be atleast 2 char long .';
                Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                return false;
            }
        },
*/

            minimunLength: function (n, prop, msg) {
                // console.log(n, prop, msg);
                return (this.checkNull(prop, msg)) && (this.checkLength(n, prop, msg));
            },




            checkNull: function (prop, msg) {
                if (prop != null) {
                    console.log("checkNullTrue");
                    return true;
                } else {
                    var message = '<strong>Ups!</strong>' + msg + ' must be atleast 2 char long .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    return false;
                }
            },

            checkLength: function (n, prop, msg) {
                if (prop.length > n) {
                    console.log("check leength  True");
                    console.log(2);
                    return true;
                } else {
                    console.log(3);
                    var message = '<strong>Ups!</strong>' + msg + ' must be atleast 2 char long .';
                    Flash.create('danger', message, 4000, { class: 'custom-class', id: 'custom-id' }, true);
                    return false;
                }
            },

            checkPrice: function (price, msg) {
                if ((price != null)) {
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


