(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    //Controller.$inject = ['dependencies'];

    /* @ngInject */
    function LoginController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
