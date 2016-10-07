(function() {
  'use strict';
  angular.module('module.controller.coworkers', [])
    .controller('controller.coworkers', controllerCoworkers);

    controllerCoworkers.$inject=[
        '$scope',
        '$resourceService',
        '$state',
        'employeeService',
        'serviceStorage',
        '$location',
        '$mdDialog',
        '$mdToast'
    ];

    function controllerCoworkers($scope, $resourceService, $state, coworkersService, serviceStorage, $location, $mdDialog,$mdToast) {
      var waitingEfects=function(messages){
        $scope.loading=true; 
        $scope.messages_load=messages;
        $scope.error_messages=false;
      }
      waitingEfects("Cargando...");
      coworkersService.employee.list(function (response) {
        var array_users=[];
        for(var i in response.results){
          var detail_user=response.results[i];
          array_users.push(detail_user);
        }
        $scope.active="Activo";
        $scope.selected = null;
        $scope.searchText = '';
        $scope.users = array_users;
        $scope.selected = $scope.users[0];
        stopWaitingEffect();
      }, function (error) {
          showError(error);
      });

      var onChange=function(user){
        waitingEfects("Actualizando...");
        coworkersService.employee.updateBlock({employee_id : user.pk,action : user.is_blocked},function (response) {
        stopWaitingEffect();
        showSimpleToast('EXITO. Se actualizó el registro correctamente');
        },function (error) {
          if(user.is_blocked){
            user.is_blocked=false;
          }else{
            user.is_blocked=true;
          }
          
          showError(error);
        });
      }

      $scope.showConfirm = function(ev,user) {
        var confirm = $mdDialog.confirm()
              .title('Confirmación')
              .textContent('¿Estas seguro que deseas cambiar el estado?')
              .targetEvent(ev)
              .ok('Si')
              .cancel('No');
        $mdDialog.show(confirm).then(function() {
        onChange(user);
        }, function() {
          if(user.is_blocked){
            user.is_blocked=false;
          }else{
            user.is_blocked=true;
          }
        });
      }; 

      $scope.selectUser = function (user) {
        console.log("User selected : "+user.pk);
      };
      $scope.findSkills=function(){
        $state.go('skills');
      };

      var showSimpleToast = function(messages) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(messages)
            .position('top right' )
            .hideDelay(3000)
        );
      };

      var stopWaitingEffect=function(){
        $scope.loading=false;
      }
      
      var showError=function(error){
        $scope.error_messages=true;
        showSimpleToast("ERROR EN EL PROCESO. Status : "+error.status+", "+error.statusText);
        $scope.loading=false;
      }
      
    }

})();
