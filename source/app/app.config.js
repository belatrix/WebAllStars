(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);

    config.$inject = [
        '$httpProvider',
        '$resourceProvider',
        '$mdIconProvider',
        '$mdThemingProvider'
    ];

    function config($httpProvider,
                    $resourceProvider,
                    $mdIconProvider,
                    $mdThemingProvider) {

        $resourceProvider.defaults.stripTrailingSlashes = false;

        $httpProvider.interceptors.push(
            ['$q', '$location','serviceStorage', '$rootScope',
            function ($q, $location, serviceStorage, $rootScope) {
                return {
                  'request': function (config) {
                      config.headers = config.headers || {};
                      if (serviceStorage.getData('token')) {
                          config.headers.Authorization = serviceStorage.getData('token');
                      }
                      $rootScope.$broadcast('loadingBefore');
                      return config;
                  },
                  'response': function(response) {
                    $rootScope.$broadcast('loadingAfter');
                    return response;
                  },
                  'responseError': function(response) {
                      $rootScope.$broadcast('loadingAfter');
                      if(response.status === 401 ||
                         response.status === 403 ||
                         response.status===0) {

                          $location.path('/login');

                      }
                      return $q.reject(response);
                  }
                };
            }]
        );

        $mdIconProvider
            .icon("menu", "assets/svg/menu.svg", 24)
            .icon("share", "assets/svg/share.svg", 24)
            .icon("add-white", "assets/svg/add-white.svg", 24)
            .icon("done-white", "assets/svg/done-white.svg", 24)
            .icon("account", "assets/svg/account.svg", 36)
            .icon("arrow_back", "assets/svg/arrow_back.svg", 24)
            .icon("arrow_forward", "assets/svg/arrow_forward.svg", 24)
            .icon("caret_up", "assets/svg/caret_up.svg", 24)
            .icon("caret_down", "assets/svg/caret_down.svg", 24)
            .icon("search", "assets/svg/search.svg", 24)
            .icon("close-light", "assets/svg/close-light.svg", 24)
            .icon("more-vert", "assets/svg/ic_more_vert.svg", 24)
            .icon("more_horiz_black", "assets/svg/more_horiz_black.svg", 24)
            .icon("list", "assets/svg/list.svg", 24)
            .icon("chart", "assets/svg/chart.svg", 24)
            .icon("close", "assets/svg/close.svg", 24);

        $mdThemingProvider
            .theme('default')
            .primaryPalette('orange')
            .accentPalette('blue');

    }

    function run($rootScope, $resourceService, $state) {

        var checkingSession = function() {

            var verify = $resourceService.request('verify');

              verify.get(function(verify){
                  //$state.go('');
              },function(error){
                  $state.go('login');
              });

        };

        $rootScope.$on('$locationChangeStart',function(obj,data){

            //|checkingSession();

        });

    }

})();
