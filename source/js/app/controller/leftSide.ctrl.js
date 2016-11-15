(function() {
    'use strict';
    angular.module('module.controller.leftSide', [])
        .controller('controller.leftSide', controllerLeftSide);

    controllerLeftSide.$inject = ['$scope', '$mdSidenav', '$mdUtil', '$log'];

    function controllerLeftSide($scope, $mdSidenav, $mdUtil, $log) {

        $scope.close = close;

        function close() {
            $mdSidenav('left')
                .close()
                .then(function() {
                    $log.debug("close LEFT is done");
                });
        }

    }

})();
