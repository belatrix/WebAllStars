(function () {
  'use strict';
  angular.module('module.controller.skills', [])
    .controller('controller.skills', controllerSkills);

  controllerSkills.$inject = [
    '$scope',
    '$mdMedia',
    'skillService',
    '$mdDialog'
  ];

  function controllerSkills($scope, $mdMedia, skillService, $mdDialog) {

    this.$mdMedia = $mdMedia;
    skillService.skills.list(function (response) {
      var array_skills = response;
      $scope.skills = array_skills;
      $scope.selected = $scope.skills[0];
    }, function (error) {
      showError(error);
    });
    var showError = function (error) {
      $scope.error_messages = true;
      showSimpleToast("ERROR EN EL PROCESO. Status : " + error.status + ", " + error.statusText);
      $scope.loading = false;
    }
     $scope.addSkill = function ($event) {
       var self = this;
       var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
       this.$mdDialog.show({
         templateUrl: './views/newSkill.html',
         parent: angular.element(document.body),
         targetEvent: $event,
         controller: "'controller.newskill",
         controllerAs: 'ctrl',
         clickOutsideToClose: true,
         fullscreen: useFullScreen
       }).then(function (Skill) {
         var newSkill = Skill.fromCreate(Skill);
         self.Skills.push(newSkill);
         self.selectSkill(newSkill);
         self.openToast("Skill added");
       }, function () {
         console.log('You cancelled the dialog.');
       });
     };

  }

})();