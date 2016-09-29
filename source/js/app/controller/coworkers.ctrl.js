(function() {
  'use strict';
  angular.module('module.controller.coworkers', [])
    .controller('controller.coworkers', controllerCoworkers);

    controllerCoworkers.$inject=[
        '$scope',
        '$resourceService',
        '$state',
        'employeeService',
        'serviceStorage'
    ];

    function controllerCoworkers($scope,$resourceService,$state,coworkersService,serviceStorage) {
      $scope.loading=true;
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
        $scope.loading=false;
      }, function (error) {
         
      });

      $scope.onChange=function(value,id_user){
        console.log("Entre al flag : "+value+"** PK : "+id_user);
        var parameters={}
        parameters.employee_id = id_user;
        parameters.action = value;
        coworkersService.empĺoyee.updateBlock(parameters,function (response) {
          console.log("Success...!!!");
        }, function (error) {
           
        });
      }
    }

})();
