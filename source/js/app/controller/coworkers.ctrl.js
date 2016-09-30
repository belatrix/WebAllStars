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
        '$mdDialog'
    ];

    function controllerCoworkers($scope,$resourceService,$state,coworkersService,serviceStorage,$mdDialog) {
      var waitingEfects=function(messages){
        $scope.loading=true; 
        $scope.messages_load=messages;
        $scope.error_messages=false;
      }
      waitingEfects("Cargando...");
      coworkersService.empĺoyee.list(function (response) {
        var array_users=[];
        for(var i in response.results){
          var detail_user=response.results[i];
          array_users.push(detail_user);
        }
        $scope.active="Activo";
        $scope.selected = null;
        $scope.searchText = '';
        $scope.users = array_users;
        stopWaitingEffect();
      }, function (error) {
          showError(error);
      });

      var onChange=function(ev,value,id_user){
        waitingEfects("Actualizando...");
        coworkersService.empĺoyee.updateBlock({employee_id : id_user,action : value},function (response) {
        stopWaitingEffect();
        showAlert(ev);
        },function (error) {
          showError(error);
        });
      }

      $scope.showConfirm = function(ev,value,id_user) {
        var confirm = $mdDialog.confirm()
              .title('Confirmación')
              .textContent('¿Estas seguro que deseas cambiar el estado?')
              .targetEvent(ev)
              .ok('Si')
              .cancel('No');
        $mdDialog.show(confirm).then(function() {
        onChange(ev,value,id_user);
        }, function() {
        });
      };

      var showAlert = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Exito..!!')
            .textContent('Se actualizo el registro correctamente')
            .ok('Gracias')
            .targetEvent(ev)
        );
      };

      var stopWaitingEffect=function(){
        $scope.loading=false;
      }
      
      var showError=function(error){
        $scope.error_messages=true;
        $scope.status = "* Status : "+error.status+", "+error.statusText;
        $scope.error_detail="* Detail : "+angular.toJson(error.config);
        $scope.loading=false;
      }
    }

})();
