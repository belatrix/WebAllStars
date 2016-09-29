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
        console.log(response.results[0].username+"**"+response.results[1].username);
      }, function (error) {
         
      });
    }

})();
