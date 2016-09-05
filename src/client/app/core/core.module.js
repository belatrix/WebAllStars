(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'ngRoute',
            'ngResource',
            'ngMaterial',
            'ngStorage',
            'ngSanitize',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'ui.router',
            'firebase'
        ]);
})();
