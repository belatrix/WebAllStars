(function () {
    'use strict';
    angular.module('config.i18n', ['pascalprecht.translate']).config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'js/app/config/i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    });
})();
