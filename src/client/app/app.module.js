(function() {
    'use strict';

    angular
        .module('app', [
            /**
            Shared modules
            */
            'app.core',
            'app.common',
            /**
            Feature areas
            */
            'app.authentication',
            'app.dashboard'
        ]);
})();
