(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('ActivityController', ActivityController);

    //ActivityController.$inject = ['dependencies'];

    /* @ngInject */
    function ActivityController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
