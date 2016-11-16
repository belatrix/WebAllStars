(function() {
  'use strict';
  angular.module('module.controller.login', [])
    .controller('controller.login', controllerLogin);
    controllerLogin.$inject=[
    	'$scope',
    	'$resourceService',
      '$state',
      'loginService',
      'storageService'
    ];

    function controllerLogin($scope, $resourceService, $state, loginService, storageService) {

      $scope.getSignIn=function(user){

        $scope.loading=true;

      	loginService.signIn(user,function(data){
          console.log("Token : "+data.token);
          storageService.setData('token',data.token);
          $state.go('coworkers');
        },function(){
          $scope.loading = false;
        });

      };

    }

})();
