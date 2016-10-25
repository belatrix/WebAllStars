(function() {
  'use strict';
  angular.module('module.controller.rightSide', [])
    .controller('controller.rightSide', controllerRightSide); 

    controllerRightSide.$inject=[
    	'$scope',
    	'$mdSidenav',
      '$mdUtil',
      '$log',
      '$stateParams',
      'activityService'
    ];

    function controllerRightSide($scope,$mdSidenav,$mdUtil,$log,$stateParams,activityService) {      

      if($stateParams.employee_id) {
        activityService.getMessageByEmployeeId.list({employee_id : $stateParams.employee_id},
              function (response) {
                $scope.employeeMessage = response.results;
              }, function (error) {
                showError(error);
            });
      }

      $scope.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };
    	
    }
    
})();