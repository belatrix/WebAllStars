(function() {
    'use strict';

    angular
        .module('app', [
            'ngAnimate',
            'ngRoute',
            'ngResource',
            'ngMaterial',
            'ngStorage',
            'ui.router',
            'config.routes',
            'config.theme',
            'module.controller',
            'module.service',
            'module.constant',
            'module.component',
            'app.authentication',
            'app.dashboard'
        ]);
})();
