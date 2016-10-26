(function () {
  'use strict';
  angular.module('module.controller.skills', [])
    .controller('controller.skills', controllerSkills);

  controllerSkills.$inject = [
    '$scope',
    '$mdMedia',
    'skillService',
    'paginationService',
    '$mdDialog',
    '$mdToast'
  ];

  function controllerSkills($scope, $mdMedia, skillService, paginationService, $mdDialog, $mdToast) {

    this.$mdMedia = $mdMedia;
    var self = this;
    var waitingEfects = function (messages) {
      self.loading = true;
      self.messages_load = messages;
      self.error_messages = false;
    }
    var onList = function () {
      skillService.skills.list(function (response) {
        console.log("Exitooooo");
        var array_skills = response.results;
        $scope.skills = array_skills;
        self.items = $scope.skills;
        console.log("A : " + self.items)
        initController();
      }, function (error) {
        showError(error);
      })
    };

    onList();

    //Pagination Section
    $scope.pager = {};
    $scope.setPage  = function (page) {
      console.log("B : " + self.items.length)
      if (page < 1 || page > $scope.pager.totalPages) {
        return;
      }
      // get pager object from service
      $scope.pager = paginationService.GetPager(self.items.length, page);
      console.log("C    " + $scope.pager.pages.length);
      // get current page of items vm
      $scope.skillsPerPage = self.items.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    };

    var initController = function () {
      // initialize to page 1
      $scope.setPage(1);
    };

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
      showSimpleToast("ERROR EN EL PROCESO. " + error.data.name);
      self.loading = false;
    };
    var stopWaitingEffect = function () {
      self.loading = false;
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
