(function() {
  'use strict';
  angular.module('module.controller.service', [])
    .controller('controller.service', serviceCtrl); 

      serviceCtrl.$inject=[
      	'$scope',
      	'$resourceService',
        '$state',
        '$mdDialog',
        '$mdMedia'
      ];

    function serviceCtrl($scope, $resourceService, $state, $mdDialog, $mdMedia) {

      var serviceList = $resourceService.request('serviceList'),
          serviceUpdate = $resourceService.request('serviceUpdate'),
          params = {
            skip: 0,
            limit: 20
          };

      var serviceGet = function(){
        serviceList.get(params,function(users){
          $scope.loading = false;
          $scope.services = users;
        });
      };

      serviceGet();

      $scope.changeService = function(service){
        serviceUpdate.put(service, function(service){
          $scope.loading = false;
        });
      };

      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

      $scope.showDialog = function(service, action, ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/dialog/service.detail.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          locals: {
            service: service,
            action: action
          }
        })
        .then(function(answer) {
          console.log('open');
        }, function() {
            serviceGet();
        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };
   
    }

    function DialogController($scope, $mdDialog, service, action, $resourceService) {
      
      $scope.action = action;
      $scope.service = service;
      
      var serviceUpdate = $resourceService.request('serviceUpdate'),
          serviceCreate = $resourceService.request('serviceCreate'),
          params = {
            skip: 0,
            limit: 20
          };

      $scope.serviceSave = function(service){
        serviceCreate.save(service, function(response){
          $scope.loading = false;
          $scope.cancel();
        });
      };

      $scope.changeService = function(service){
          serviceUpdate.put(service, function(response){
            $scope.loading = false;
            $scope.cancel();
          });
      };

      $scope.cancel = function() {
         $mdDialog.cancel();
       }; 
     
      }
    
})();
