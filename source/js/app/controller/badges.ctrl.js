(function() {
    'use strict';
    angular.module('module.controller', ['ngMaterial'])
        .controller('controller.badges', badgesController);

    function badgesController($scope) {
        $scope.badges = [];
        $scope.selected = null;
    }

})();



