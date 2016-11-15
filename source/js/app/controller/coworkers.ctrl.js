(function() {
    'use strict';
    angular.module('module.controller').controller('controller.coworkers', coworkersController);

    coworkersController.$inject = ['$scope', '$state', '$q', '$timeout', '$translate', '$mdDialog', '$mdToast', '$resourceService', 'employeeService', 'serviceStorage'];

    function coworkersController($scope, $state, $q, $timeout, $translate, $mdDialog, $mdToast, $resourceService, employeeService, serviceStorage) {
        $scope.users = [];
        $scope.active = "Activo";
        $scope.loading = false;
        $scope.selected = null;
        $scope.searchText = null;
        $scope.selected = null;

        $scope.listSpecific = listSpecific;
        $scope.selectUser = selectUser;
        $scope.showConfirm = showConfirm;

        _init();

        /*private functions*/
        function _init() {
            _list_Employee(null);
        }

        function _list_Employee(employee) {
            var objReq = {};
            objReq.search = employee;
            $scope.active = "Activo";
            $scope.selected = null;
            $scope.searchText = '';

            employeeService.empĺoyee.list(objReq, function(response) {
                var array_users = [];
                for (var i in response.results) {
                    var detail_user = response.results[i];
                    array_users.push(detail_user);
                }

                $scope.users = array_users;
                $scope.selected = $scope.users[0];
                if (employee !== null) {
                    $scope.searchText = employee;
                }
                _stopWaitingEffect();
            }, function(error) {
                _showError(error);
            });
        }

        function _showError(error) {
            _showSimpleToast("ERROR EN EL PROCESO. Status : " + error.status + ", " + error.statusText);
            $scope.loading = false;
        }

        function _stopWaitingEffect() {
            $scope.loading = false;
        }

        function _showSimpleToast(messages) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(messages)
                .position('bottom right')
                .hideDelay(3000)
            );
        }

        function _onChange(user) {
            employeeService.empĺoyee.updateBlock({
                employee_id: user.pk,
                action: user.is_blocked
            }, function(response) {
                _stopWaitingEffect();
                _showSimpleToast('EXITO. Se actualizó el registro correctamente');
            }, function(error) {
                if (user.is_blocked) {
                    user.is_blocked = false;
                } else {
                    user.is_blocked = true;
                }

                _showError(error);
            });
        }
        /*end private functions*/

        /*public functions*/
        function listSpecific(employee) {
            _list_Employee(employee);
        }

        function selectUser(user) {
            $state.go('coworker-detail', {
                employee_id: user.pk
            });
        }

        function showConfirm(ev, user) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación')
                .textContent('¿Estas seguro que deseas cambiar el estado?')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                _onChange(user);
            }, function() {
                if (user.is_blocked) {
                    user.is_blocked = false;
                } else {
                    user.is_blocked = true;
                }
            });
        }
        /*end public functions*/

    }
})();
