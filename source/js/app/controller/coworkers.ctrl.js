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
        '$mdDialog',
        '$mdToast',
        '$q', '$timeout'
    ];

    function controllerCoworkers($scope,$resourceService,$state,coworkersService,serviceStorage,$mdDialog,$mdToast,$q, $timeout) {

      var listEmployee=function(employee){
        var objReq={};
        objReq.search=employee;
        coworkersService.empĺoyee.list(objReq,function (response) {
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
          if(employee!=null){
            $scope.searchText=employee;  
          }
          stopWaitingEffect();
        }, function (error) {
            showError(error);
        });
      }

      $scope.list_specific=function(employee){
        listEmployee(employee);
      }

      listEmployee(null);

      var onChange=function(user){
        coworkersService.empĺoyee.updateBlock({employee_id : user.pk,action : user.is_blocked},function (response) {
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

      var showSimpleToast = function(messages) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(messages)
            .position('bottom right' )
            .hideDelay(3000)
        );
      };

      var stopWaitingEffect=function(){
        $scope.loading=false;
      }
      
      var showError=function(error){
        showSimpleToast("ERROR EN EL PROCESO. Status : "+error.status+", "+error.statusText);
        $scope.loading=false;
      }
      
    }
})();
