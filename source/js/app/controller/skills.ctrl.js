(function () {
  'use strict';
  angular.module('module.controller.skills', [])
    .controller('controller.skills', controllerSkills);

  controllerSkills.$inject = ['$scope','$mdMedia','skillService','paginationService','$mdDialog','$mdToast'];

  function controllerSkills($scope, $mdMedia, skillService, paginationService, $mdDialog, $mdToast) {

    this.$mdMedia = $mdMedia;
    var self = this;
    var waitingEffects = function (messages) {
      self.loading = true;
      self.messages_load = messages;
      self.error_messages = false;
    };
    function onList() {
      skillService.skills.list(function (response) {
        $scope.skills = response.results;
        self.items = $scope.skills;
        initController();
      }, function (error) {
        showError(error);
      });
    }

    onList();

    //Pagination Section
    $scope.pager = {};
    $scope.setPage  = function (page) {
      if (page < 1 || page > $scope.pager.totalPages) {
        return;
      }
      // get pager object from service
      $scope.pager = paginationService.GetPager(self.items.length, page);
      // get current page of items vm
      $scope.skillsPerPage = self.items.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    };

    function initController() {
      // initialize to page 1
      $scope.setPage(1);
    }

    function showSimpleToast(messages) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(messages)
          .position('bottom right')
          .hideDelay(3000)
      );
    }
    function showError(error) {
      showSimpleToast("ERROR EN EL PROCESO. " + error.data.name);
      self.loading = false;
    }
    function stopWaitingEffect() {
      self.loading = false;
    }
    function onChange(skill) {
      waitingEffects("Actualizando...");
      skillService.skills.updateState({ keyword_id: skill.id, name: skill.name, is_active: skill.is_active }, function () {
        stopWaitingEffect();
        showSimpleToast('Se actualizó el registro correctamente');
        onList();
      }, function (error) {
        skill.is_active = !skill.is_active;
        showError(error);
      });
    }
    function onCreate(skill) {
      waitingEffects("Creando...");
      skillService.skills.create({ name: skill.name, is_active: skill.is_active }, function () {
        stopWaitingEffect();
        showSimpleToast('EXITO. Se ha creado el registro correctamente');
        onList();
      }, function (error) {
        showError(error);
      });
    }
    function onDelete(skill) {
      waitingEffects("Creando...");
      skillService.skills.delete({ kind: 'keyword', id: skill.id }, function () {
        stopWaitingEffect();
        showSimpleToast('EXITO. Se ha eliminado el registro correctamente');
        onList();
      }, function (error) {
        showError(error);
      });
    }

    $scope.showConfirm = function (ev, skill) {
      var confirm = $mdDialog.confirm()
        .title('Confirmación')
        .textContent('¿Estas seguro que deseas cambiar el estado?')
        .targetEvent(ev)
        .ok('Si')
        .cancel('No');
      $mdDialog.show(confirm).then(function () {
        onChange(skill);
      }, function () {
        skill.is_active = !skill.is_active;
      });
    };
    function skillDialogCtrl($scope, $mdDialog, skillData, operation) {
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
      $scope.options = [
        { value: false, label: 'false' },
        { value: true, label: 'true' }
      ];
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.save = function () {
        $mdDialog.hide($scope.skill);
      };
    }
    $scope.manageSkill = function ($event, skill, operation_) {
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
        controller: skillDialogCtrl,
        clickOutsideToClose: true,
        fullscreen: useFullScreen,
        locals: {
          skillData: tempData,
          operation: operation
        }
      }).then(function (skill) {
        if (operation == 'A')
          onCreate(skill);
        else
          onChange(skill);
      }, function () {
      });
    };
    $scope.deleteSkill = function (ev, skill) {
      var confirm = $mdDialog.confirm()
        .title('Confirmación')
        .textContent('¿Estas seguro que deseas eliminar este registro?')
        .targetEvent(ev)
        .ok('Si')
        .cancel('No');
      $mdDialog.show(confirm).then(function () {
        onDelete(skill);
      }, function () {

      });
    };


  }
})();
