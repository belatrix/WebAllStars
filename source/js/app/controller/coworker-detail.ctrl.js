(function() {
  'use strict';
  angular.module('module.controller.coworker-detail', [])
    .controller('controller.coworker-detail', controllerCoworkerDetail);

    controllerCoworkerDetail.$inject=[
    	'$scope',
      'employeeService',      
      'loginService',
      'skillService',
      'startService',
      '$mdDialog',
      '$mdToast',
      '$state',
      '$stateParams'
    ];

    function controllerCoworkerDetail($scope, employeeService, loginService, skillService, startService, $mdDialog, $mdToast, $state, $stateParams) {
      var showSimpleToast = function(messages) {
            $mdToast.show (
              $mdToast.simple()
                .textContent(messages)
                .position('top right' )
                .hideDelay(3000)
          )},
          showError = function(error){
            $scope.error_messages = true;
            showSimpleToast("ERROR EN EL PROCESO. Status: "+error.status+", "+error.statusText);
            $scope.loading = false;
          };

      if($stateParams.employee_id) {
          employeeService.getEmployeeById.user({employee_id : $stateParams.employee_id},
            function (response) {
              $scope.user = {
                userId: response.pk,
                username: response.username,
                first_name: response.first_name,
                last_name: response.last_name,
                skype_id: response.skype_id,
                img: response.avatar,
                location: response.location.name
              };
           }, function (error) {
                showError(error);
          });

          skillService.listByEmployeedId({employee_id : $stateParams.employee_id},
            function (response) {
              $scope.skills = response.results;
            }, function (error) {
              showError(error);
          });

          startService.getStartsByEmployeeId.list({employee_id : $stateParams.employee_id},
            function (response) {
              $scope.starts = response.results;
            }, function (error) {
              showError(error);
          });
      } else if (!$stateParams.employee_id != $stateParams.employee_id === null){
          $state.go('coworkers');
      }

      $scope.goBack = function () {
        $state.go('coworkers');
      };
    }
})();
