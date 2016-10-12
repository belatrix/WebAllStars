(function() {
  'use strict';
  angular.module('module.controller.skills', [])
    .controller('controller.skills', controllerSkills);

    controllerSkills.$inject=[
    	'$scope',
      'loginService',
      'employeeService',
      'skillService',
      '$mdDialog',
      '$mdToast'
    ];

    function controllerSkills($scope, loginService, employeeService, skillService, $mdDialog, $mdToast) {
      var id = 85,
          showSimpleToast = function(messages) {
            $mdToast.show (
              $mdToast.simple()
                .textContent(messages)
                .position('top right' )
                .hideDelay(3000)
          )},
          showError = function(error){
            $scope.error_messages = true;
            showSimpleToast("ERROR EN EL PROCESO. Status : "+error.status+", "+error.statusText);
            $scope.loading = false;
          };

      employeeService.getEmployee.user({employee_id : id}, function (response) {
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

      skillService.getSkillsList.skillsList({employee_id : id}, function (response) {
               $scope.skills = response.results;
            }, function (error) {
              showError(error);
            });
    }
})();
