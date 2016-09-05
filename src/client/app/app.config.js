(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);

    config.$inject = [
        '$httpProvider',
        '$resourceProvider'
    ];

    function config($httpProvider,
                    $resourceProvider) {

        $resourceProvider.defaults.stripTrailingSlashes = false;

        $httpProvider.interceptors.push(
            ['$q', '$location','storageService', '$rootScope',
            function ($q, $location, storageService, $rootScope) {
                return {
                  'request': function (config) {
                      config.headers = config.headers || {};
                      if (storageService.getData('token')) {
                          config.headers.Authorization = storageService.getData('token');
                          config.headers['X-CSRFToken'] = 'IB2ulAHjBiIqSQ4gMow93bCUrGpGHDq0';
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
    }

    function run($rootScope, storageService, $location) {

        function checkingSession() {
            var hasToken = storageService.getData('token');
            if (hasToken) {
                $location.path('/activity');
            }else{
                $location.path('/login');
            }
        }

        $rootScope.$on('$locationChangeStart',function(obj,data){
            checkingSession();
        });

    }

})();
