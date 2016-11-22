(function() {

    var app = angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngMaterial',
        'ngStorage',
        'ngAnimate',
        'ngMessages',
        'ui.router',
        'module.controller',
        'module.service',
        'module.constant',
        'module.component',
        'config.routes',
        'config.theme',
        'pascalprecht.translate'
    ]).config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'js/app/config/i18n/locale-',
            suffix: '.json'
        });
      $translateProvider.preferredLanguage('en');
    });

    app.config(function ($httpProvider, $resourceProvider) {
      $resourceProvider.defaults.stripTrailingSlashes = false;

      $httpProvider.interceptors.push(['$q', '$location','storageService', '$rootScope', function($q, $location, storageService, $rootScope) {

          return {
                  'request': function (config) {
                      config.headers = config.headers || {};
                      if (storageService.getData('token')) {
                          config.headers.Authorization = 'Token ' + storageService.getData('token');
                      }
                      $rootScope.$broadcast('$request');
                      $rootScope.$broadcast('loadingBefore');
                      return config;
                  },
                  'response': function(response) {
                    $rootScope.$broadcast('$responseSuccess');
                    $rootScope.$broadcast('loadingAfter');
                    return response;
                  },
                  'responseError': function(response) {
                      $rootScope.$broadcast('$responseError');
                      $rootScope.$broadcast('loadingAfter');
                      if(response.status === 401 ||
                         response.status === 403 ||
                         response.status===0) {
                          console.log("Me redirecciona por esta validacion");
                          $location.path('/login');

                      }
                      return $q.reject(response);
                  }
          };
      }]);

    });
    /*
    app.run( function( $rootScope ,$resourceService, $state, storageService) {
      var checkingSession,
          hasToken;

        checkingSession = function(){

          hasToken = storageService.getData('token');
          if(hasToken == null){
            $state.go('login');
          }
        };

        $rootScope.$on('$locationChangeStart',function(obj,data){
            checkingSession();
        });

    });
    */

})();
