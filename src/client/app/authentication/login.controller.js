(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$location',
        'storageService',
        'loginService'
    ];

    /* @ngInject */
    function LoginController($location,
                             storageService,
                             loginService) {
        var vm = this;

        vm.user = {};
        vm.laoding = false;

        vm.getSignIn = signIn;
        vm.disabledSignButton = disabledSignButton;

        activate();

        function activate() {
            vm.user = {
                username: '',
                password: ''
            };
        }

        /**
         * Sign in method
         */
        function signIn() {
            vm.laoding = true;
            loginService.signIn(vm.user)
                .then(function (data) {
                    storageService.setData('token', data.token);
                    $location.path('/activity');
                }, function () {
                    vm.loading = false;
                });
        }

        /**
         * Disable sign in button
         */
        function disabledSignButton() {
            return !vm.user.username || !vm.user.password || vm.loading;
        }
    }
})();
