(function() {
    'use strict';

    angular
        .module('app.authentication')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/authentication/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
