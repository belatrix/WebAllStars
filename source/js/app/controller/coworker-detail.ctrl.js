(function() {
    'use strict';
    angular.module('module.controller.coworker-detail', [])
        .controller('controller.coworker-detail', coworkerDetailController);

    coworkerDetailController.$inject = ['$scope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'employeeService', 'loginService', 'skillService', 'startService'];

    function coworkerDetailController($scope, $state, $stateParams, $mdDialog, $mdToast, employeeService, loginService, skillService, startService) {

        $scope.goBack = goBack;

        _init();

        /*private functions*/
        function _init() {
            if ($stateParams.employee_id) {
                return employeeService.user({
                        employee_id: $stateParams.employee_id
                    },
                    function(response) {
                        $scope.user = {
                            userId: response.pk,
                            username: response.username,
                            first_name: response.first_name,
                            last_name: response.last_name,
                            skype_id: response.skype_id,
                            img: response.avatar,
                            location: response.location.name
                        };
                    },
                    function(error) {
                        _showError(error);
                    });

                return skillService.listByEmployeeId({
                        employee_id: $stateParams.employee_id
                    },
                    function(response) {
                        $scope.skills = response.results;
                    },
                    function(error) {
                        _showError(error);
                    });

                return startService.list({
                        employee_id: $stateParams.employee_id
                    },
                    function(response) {
                        $scope.starts = response.results;
                    },
                    function(error) {
                        _showError(error);
                    });
            } else if (!$stateParams.employee_id) {
                $state.go('coworkers');
            }
        }

        function _showSimpleToast(messages) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(messages)
                .position('top right')
                .hideDelay(3000)
            );
        }

        function _showError(error) {
            $scope.error_messages = true;
            _showSimpleToast("ERROR EN EL PROCESO. Status: " + error.status + ", " + error.statusText);
            $scope.loading = false;
        }
        /*end private functions*/

        /*public functions*/
        function goBack() {
            $state.go('coworkers');
        }
        /*end public functions*/
    }
})();
