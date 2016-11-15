(function() {
  'use strict';
  angular.module('module.controller.coworkers', [])
    .controller('controller.coworkers', coworkersController);

    coworkersController.$inject=['$scope','$resourceService','$state','employeeService','serviceStorage','$mdDialog','$mdToast','$q', '$timeout','$translate'];

    function coworkersController($scope,$resourceService,$state,coworkersService,serviceStorage,$mdDialog,$mdToast,$q, $timeout,$translate) {

      /* private */
      function list_Employee(employee){
          var objReq={};
          objReq.search=employee;
          $scope.active="Activo";
          $scope.selected = null;
          $scope.searchText = '';

          coworkersService.empĺoyee.list(objReq,function (response) {
            var array_users=[];
            for(var i in response.results){
              var detail_user=response.results[i];
              array_users.push(detail_user);
            }

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

      /* public */
      $scope.listSpecific=function(employee){
        list_Employee(employee);
      }

      list_Employee(null);

      /* private */
      function onChange(user){
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
      /* public */
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

      /* public */
      $scope.selectUser = function (user) {
        $state.go('coworker-detail', {employee_id: user.pk})
      };

      /* private */
      function showSimpleToast(messages){
        $mdToast.show(
          $mdToast.simple()
            .textContent(messages)
            .position('bottom right' )
            .hideDelay(3000)
        );
      }

       /* private */
      function stopWaitingEffect(){
        $scope.loading=false;
      }

       /* private */
      function showError(error){
        showSimpleToast("ERROR EN EL PROCESO. Status : "+error.status+", "+error.statusText);
        $scope.loading=false;
      }

    }
})();
