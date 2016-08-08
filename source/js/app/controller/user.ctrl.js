(function() {
  'use strict';
  angular.module('module.controller.user', [])
    .controller('controller.user', userCtrl); 

      userCtrl.$inject=[
      	'$scope',
      	'$resourceService',
        '$state',
        '$mdDialog',
        '$mdMedia'
      ];

    function userCtrl($scope, $resourceService, $state, $mdDialog, $mdMedia) {

      var userList = $resourceService.request('userList'),
          userUpdate = $resourceService.request('userUpdate'),
          params = {
            skip: 0,
            limit: 20
          };

      var userGet = function(){
        userList.get(params,function(users){
          $scope.loading = false;
          $scope.users = users;
        });
      };

      userGet();

      $scope.changeUser = function(user){
        userUpdate.put(user, function(user){
          $scope.loading = false;
        });
      };

      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

      $scope.showDialog = function(user, action, ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/dialog/user.detail.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          locals: {
            user: user,
            action: action
          }
        })
        .then(function(answer) {
          console.log('open');
        }, function() {
          userGet();
        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };
      
    }

    function DialogController($scope, $mdDialog, user, action, $resourceService) {
      $scope.user = user;
      $scope.action = action;
      var userUpdate = $resourceService.request('userUpdate'),
          userCreate = $resourceService.request('userCreate');

      $scope.userSave = function(user){
        userCreate.save(user, function(user){
          $scope.loading = false;
          close();
        });
      };

      $scope.changeUser = function(user){
        userUpdate.put(user, function(user){
          $scope.loading = false;
          close();
        });
      };

     var close = $scope.cancel = function() {
       $mdDialog.cancel();
     };
   }
    
})();

