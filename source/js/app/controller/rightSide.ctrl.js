(function() {
  'use strict';
  angular.module('module.controller.rightSide', [])
    .controller('controller.rightSide', controllerRightSide);

    controllerRightSide.$inject=[
    	'$scope',
    	'$mdSidenav',
      '$mdUtil',
      '$log'
    ];

    function controllerRightSide($scope,$mdSidenav,$mdUtil,$log) {

      $scope.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };

    }

})();
