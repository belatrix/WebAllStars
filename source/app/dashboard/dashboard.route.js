(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .config(router);

    function router($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('init', {
                abstract: true,
                    views: {
                        'content@': {
                            template: '<ui-view />', // NEW line, with a target for a child
                        }
                    }
            })
            .state('dashboard', {
                abstract: true,
                    views: {
                        '@': {
                            template: '<ui-view />', // NEW line, with a target for a child
                        },
                        'header@': {
                            templateUrl: 'header.view.html',
                            controller: 'HeaderController',
                            controllerAs: 'vm'
                        },
                        'content@': {
                            templateUrl: 'left-side.view.html',
                            controller: 'LeftSideController',
                            controllerAs: 'vm'
                        }
                    }
            });

        $urlRouterProvider.otherwise("/login");
    }

})();
