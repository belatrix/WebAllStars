(function() {
  'use strict';
  angular.module('module.controller.leftSide', [])
    .controller('controller.leftSide', controllerLeftSide); 

    controllerLeftSide.$inject=[
    	'$scope',
    	'$mdSidenav',
      '$mdUtil',
      '$log'
    ];

    function controllerLeftSide($scope,$mdSidenav,$mdUtil,$log) {

      $scope.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });
      };
    	
    }
    
})();