(function() {

    var app = angular.module('app', [
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
        'module.component'
    ]);


    app.config(function ($httpProvider, $resourceProvider) {

      $resourceProvider.defaults.stripTrailingSlashes = false;    
        
      $httpProvider.interceptors.push(['$q', '$location','serviceStorage', '$rootScope', function($q, $location, serviceStorage, $rootScope) {
          return {
                  'request': function (config) {
                      config.headers = config.headers || {};
                      if (serviceStorage.getData('token')) {
                          config.headers.Authorization = serviceStorage.getData('token');
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
      }]);

    });

    app.run( function( $rootScope ,$resourceService, $state) {


        var checkingSession = function(){

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

    });


})();