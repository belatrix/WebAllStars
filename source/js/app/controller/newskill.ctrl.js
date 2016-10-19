(function () {
  'use strict';
  angular.module('module.controller.newskill', [])
    .controller('controller.newskill', controllerNewSkill);

  controllerNewSkill.$inject = [
    '$scope',
    '$mdMedia',
    '$mdDialog'
  ];

  function controllerNewSkill($scope, $mdMedia, $mdDialog) {
    this.$mdDialog = $mdDialog;
    $scope.cancel = function () {
      this.$mdDialog.cancel();
    };
    $scope.save = function () {
      this.$mdDialog.hide(this.user);
    };

  }

})();