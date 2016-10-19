(function () {
  'use strict';
  angular.module('module.controller.skills', [])
    .controller('controller.skills', controllerSkills);

  controllerSkills.$inject = [
    '$scope',
    '$mdMedia',
    'skillService',
    '$mdDialog',
    '$mdToast'
  ];

  function controllerSkills($scope, $mdMedia, skillService, $mdDialog, $mdToast) {

    this.$mdMedia = $mdMedia;
    $scope.blocked = true;

    var waitingEfects = function (messages) {
      $scope.loading = true;
      $scope.messages_load = messages;
      $scope.error_messages = false;
    }
    var onList = function () {
      skillService.skills.list(function (response) {
        var array_skills = response;
        $scope.skills = array_skills;
        $scope.switchState = "Activo";
        $scope.selected = null;
        $scope.selected = $scope.skills[0];
      }, function (error) {
        showError(error);
      })
    };

    onList();

    var showSimpleToast = function (messages) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(messages)
          .position('bottom right')
          .hideDelay(3000)
      );
    };
    var showError = function (error) {
      console.log(error);
      $scope.error_messages = true;
      showSimpleToast("ERROR EN EL PROCESO. " + error.data.name);
      $scope.loading = false;
    };
    var stopWaitingEffect = function () {
      $scope.loading = false;
    };
    var onChange = function (skill) {
      waitingEfects("Actualizando...");
      skillService.skills.updateState({ keyword_id: skill.id, name: skill.name, is_active: skill.is_active }, function (response) {
        stopWaitingEffect();
        showSimpleToast('Se actualizó el registro correctamente');
      }, function (error) {
        if (skill.is_active) {
          skill.is_active = false;
        } else {
          skill.is_active = true;
        }

        showError(error);
      });
    };
    var onCreate = function (skill) {
      waitingEfects("Creando...");
      skillService.skills.create({ name: skill.name, is_active: skill.is_active }, function (response) {
        stopWaitingEffect();
        showSimpleToast('EXITO. Se ha creado el registro correctamente');
        onList();
      }, function (error) {
        showError(error);
      });
    };

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
        if (skill.is_active) {
          skill.is_active = false;
        } else {
          skill.is_active = true;
        }
      });
    };
    function newSkillCtrl($scope, $mdDialog) {
      $scope.options = [
        { value: false, label: 'false' },
        { value: true, label: 'true' },
      ];
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.save = function () {
        $mdDialog.hide(this.skill);
      };
    };

    $scope.addSkill = function ($event, skill) {
      var self = this;
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        templateUrl: './views/newSkill.view.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        controller: newSkillCtrl,
        controllerAs: 'ctrl',
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      }).then(function (skill) {
        onCreate(skill);
        console.log('You confirm the creation.');
      }, function () {
        console.log('You cancelled the dialog.');
      });
    };
    $scope.selectSkill = function (skill) {
      console.log("Skill selected : " + skill.name);
    };
  }

})();