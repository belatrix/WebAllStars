(function() {
  'use strict';
  angular.module('module.controller.login', [])
    .controller('controller.login', controllerLogin);
    controllerLogin.$inject=[
    	'$scope',
    	'$resourceService',
      '$state',
      'loginService',
      'serviceStorage'
    ];

    function controllerLogin($scope, $resourceService, $state, loginService, serviceStorage) {

      $scope.getSignIn=function(user){

        $scope.loading=true;

      	loginService.signIn(user,function(data){
          serviceStorage.setData('token',data.token);
          $state.go('activity');
        },function(){
          $scope.loading=false;
        });

      };

    }

})();
