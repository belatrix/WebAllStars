(function() {
    'use strict';

    angular
        .module('app.authentication')
        .config(router);

    function router(stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login.view.html',
                controller: 'controller.login',
                controllerAs: 'vm'
            });
    }
})();
