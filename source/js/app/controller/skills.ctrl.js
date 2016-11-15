(function() {
    'use strict';
    angular.module('module.controller.skills', [])
        .controller('controller.skills', controllerSkills);

    controllerSkills.$inject = ['$scope', '$mdMedia', '$mdDialog', '$mdToast', 'skillService', 'paginationService'];

    function controllerSkills($scope, $mdMedia, $mdDialog, $mdToast, skillService, paginationService) {
        var self = this;

        self.loading = false;
        self.error_messages = false;
        self.messages_load = null;
        self.items = null;

        $scope.pager = {};
        $scope.skills = null;
        $scope.skillsPerPage = null;

        $scope.setPage = setPage;
        $scope.showConfirm = showConfirm;
        $scope.manageSkill = manageSkill;
        $scope.deleteSkill = deleteSkill;

        _init();

        /*private functions*/
        function _init() {
            _onList();
        }

        function _waitingEffects(messages) {
            self.loading = true;
            self.messages_load = messages;
            self.error_messages = false;
        }

        function _onList() {
            return skillService.list(function(response) {
                $scope.skills = response.results;
                self.items = $scope.skills;
                /*initialize to page 1*/
                setPage(1);
            }, _showError);
        }

        function _showSimpleToast(messages) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(messages)
                .position('bottom right')
                .hideDelay(3000)
            );
        }

        function _showError(error) {
            _showSimpleToast("ERROR EN EL PROCESO. " + error.data.name);
            self.loading = false;
        }

        function _stopWaitingEffect() {
            self.loading = false;
        }

        function _onChange(skill) {
            _waitingEffects("Actualizando...");
            return skillService.updateState({
                keyword_id: skill.id,
                name: skill.name,
                is_active: skill.is_active
            }, function() {
                _stopWaitingEffect();
                _showSimpleToast('Se actualizó el registro correctamente');
                _onList();
            }, function(error) {
                skill.is_active = !skill.is_active;
                _showError(error);
            });
        }

        function _onCreate(skill) {
            _waitingEffects("Creando...");
            return skillService.create({
                name: skill.name,
                is_active: skill.is_active
            }, function() {
                _stopWaitingEffect();
                _showSimpleToast('EXITO. Se ha creado el registro correctamente');
                _onList();
            }, _showError);
        }

        function _onDelete(skill) {
            _waitingEffects("Creando...");
            return skillService.delete({
                kind: 'keyword',
                id: skill.id
            }, function() {
                _stopWaitingEffect();
                _showSimpleToast('EXITO. Se ha eliminado el registro correctamente');
                _onList();
            }, _showError);
        }

        function _skillDialogCtrl($scope, $mdDialog, skillData, operation) {
            $scope.skill = skillData;
            switch (operation) {
                case 'U':
                    $scope.operation = 'Editing';
                    break;
                case 'A':
                    $scope.operation = 'Adding';
                    break;
                default:
                    $scope.operation = 'Adding';
                    break;
            }
            $scope.options = [{
                value: false,
                label: 'false'
            }, {
                value: true,
                label: 'true'
            }];
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.save = function() {
                $mdDialog.hide($scope.skill);
            };
        }
        /*end private functions*/

        /*public functions*/
        //Pagination Section
        function setPage(page) {
            if (page < 1 || page > $scope.pager.totalPages) {
                return;
            }
            // get pager object from service
            $scope.pager = paginationService.GetPager(self.items.length, page);
            // get current page of items vm
            $scope.skillsPerPage = self.items.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        }

        function showConfirm(ev, skill) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación')
                .textContent('¿Estas seguro que deseas cambiar el estado?')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                _onChange(skill);
            }, function() {
                skill.is_active = !skill.is_active;
            });
        }

        function manageSkill($event, skill, operation_) {
            var tempData;
            var operation = operation_;
            if (skill === undefined) {
                tempData = {};
            } else {
                tempData = {
                    id: skill.id,
                    name: skill.name,
                    is_active: skill.is_active
                };
            }
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                templateUrl: './views/newSkill.view.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: _skillDialogCtrl,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    skillData: tempData,
                    operation: operation
                }
            }).then(function(skill) {
                if (operation == 'A') {
                    _onCreate(skill);
                } else {
                    _onChange(skill);
                }
            }, function() {});
        }

        function deleteSkill(ev, skill) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación')
                .textContent('¿Estas seguro que deseas eliminar este registro?')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                _onDelete(skill);
            }, function() {

            });
        }
        /*end public functions*/

    }
})();
