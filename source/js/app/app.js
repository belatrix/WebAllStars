(function() {

    var app = angular.module('app', [
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
        'module.component'
    ]);


    app.config(function ($httpProvider, $resourceProvider) {
      $resourceProvider.defaults.stripTrailingSlashes = false;

      $httpProvider.interceptors.push(['$q', '$location','serviceStorage', '$rootScope', function($q, $location, serviceStorage, $rootScope) {

          return {
                  'request': function (config) {
                      config.headers = config.headers || {};
                      if (serviceStorage.getData('token')) {
                          console.log("El token en el interceptor es  : "+serviceStorage.getData('token'));
                          config.headers['X-CSRFToken'] = serviceStorage.getData('token');
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
                          console.log("Me redirecciona por esta validacion");
                          $location.path('/login');

                      }
                      return $q.reject(response);
                  }
          };
      }]);

    });

    app.run( function( $rootScope ,$resourceService, $state, serviceStorage) {
      var checkingSession,
          hasToken;

        checkingSession = function(){
          
          hasToken = serviceStorage.getData('token');
          if(hasToken == null){
            $state.go('login');
          }          
        };

        $rootScope.$on('$locationChangeStart',function(obj,data){
            checkingSession();
        });

    });

})();
