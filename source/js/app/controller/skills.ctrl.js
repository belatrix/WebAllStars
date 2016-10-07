(function() {
  'use strict';
  angular.module('module.controller.skills', [])
    .controller('controller.skills', controllerSkills);

    controllerSkills.$inject=[
    	'$scope',
      'loginService',
      'employeeService',
        '$mdDialog',
        '$mdToast'
    ];

    function controllerSkills($scope, loginService, employeeService, $mdDialog, $mdToast) {
      var imagePath = 'https://trello-avatars.s3.amazonaws.com/8e19c573c63d0ff0a4be0fe5c352891b/170.png',
          id = 85,
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
          location: response.location.name,
          skills : [
            {
              name: 'HTML',
              description: 'Lorem ipsum dolor'
            },
            {
              name: 'css',
              description: 'Lorem ipsum dolor'
            },
            {
              name: '.Net',
              description: 'Lorem ipsum dolor'
            }
          ]
        };
        
      }, function (error) {
          showError(error);
      });
    }
})();
