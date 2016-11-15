(function() {
    'use strict';
    angular.module('module.controller.header', [])
        .controller('controllerHeader', controllerHeader);

    controllerHeader.$inject = ['$scope', '$state', '$mdDialog', '$mdUtil', '$mdSidenav', '$translate', 'loginService'];

    function controllerHeader($scope, $state, $mdDialog, $mdUtil, $mdSidenav, $translate, loginService) {

        $scope.toggleLeft = buildToggler('left');

        $scope.openMenu = openMenu;
        $scope.logOut = logOut;
        $scope.switchLanguage = switchLanguage;

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
