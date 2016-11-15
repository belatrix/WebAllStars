(function() {
    'use strict';
    angular.module('module.controller').controller('controller.footer', controllerFooter);

    controllerFooter.$inject = ['$scope', '$mdSidenav', '$mdUtil', '$log', '$translate'];

    function controllerFooter($scope, $mdSidenav, $mdUtil, $log, $translate) {

        $scope.changeLanguage = changeLanguage;

        function changeLanguage(key) {
            console.log("Aqui va todo : " + key);
            $translate.use(key);
        }

    }

})();
