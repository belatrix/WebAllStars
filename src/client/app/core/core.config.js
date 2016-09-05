(function() {
    'use strict';

    var config = {
        appErrorPrefix: '[WebConnect Error]',
        appTitle: 'WebConnect'
    };

    angular
        .module('app.core')
        .value('config', config)
        .config(configure);

        /* @ngInject */
        function configure($logProvider,
                           $mdIconProvider,
                           $mdThemingProvider) {

            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }

            $mdIconProvider
                .icon('menu', 'assets/svg/menu.svg', 24)
                .icon('share', 'assets/svg/share.svg', 24)
                .icon('add-white', 'assets/svg/add-white.svg', 24)
                .icon('done-white', 'assets/svg/done-white.svg', 24)
                .icon('account', 'assets/svg/account.svg', 36)
                .icon('arrow_back', 'assets/svg/arrow_back.svg', 24)
                .icon('arrow_forward', 'assets/svg/arrow_forward.svg', 24)
                .icon('caret_up', 'assets/svg/caret_up.svg', 24)
                .icon('caret_down', 'assets/svg/caret_down.svg', 24)
                .icon('search', 'assets/svg/search.svg', 24)
                .icon('close-light', 'assets/svg/close-light.svg', 24)
                .icon('more-vert', 'assets/svg/ic_more_vert.svg', 24)
                .icon('more_horiz_black', 'assets/svg/more_horiz_black.svg', 24)
                .icon('list', 'assets/svg/list.svg', 24)
                .icon('chart', 'assets/svg/chart.svg', 24)
                .icon('lock', 'svg/lock.svg', 24)
                .icon('person', 'svg/person.svg', 24)
                .icon('logout', 'svg/ic_close_light.svg', 24)
                .icon('close', 'assets/svg/close.svg', 24);

            $mdThemingProvider
                .theme('default')
                .primaryPalette('orange')
                .accentPalette('blue');

        }
})();
