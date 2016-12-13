(function() {
    'use strict';
    angular.module('module.controller').controller('controllerHeader', controllerHeader);

    controllerHeader.$inject = ['$scope', '$state', '$mdDialog', '$mdUtil', '$mdSidenav', '$translate', 'loginService'];

    function controllerHeader($scope, $state, $mdDialog, $mdUtil, $mdSidenav, $translate, loginService) {

        $scope.toggleLeft = buildToggler('left');

        $scope.openMenu = openMenu;
        $scope.logOut = logOut;
        $scope.switchLanguage = switchLanguage;
        $scope.key = 'es';
        $scope.changeLanguage = changeLanguage;

        /*private functions*/
        function buildToggler(navID) {
            return $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        //$log.debug("toggle " + navID + " is done");
                    });
            }, 300);
        }
        /*end private functions*/

        /*public functions*/
        function changeLanguage(key) {
            $translate.use(key);
        }

        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        function logOut() {
            loginService.logOut();
        }

        function switchLanguage(lang) {
            $translate.use(lang);
        }
        /*end public functions*/
    }

})();
