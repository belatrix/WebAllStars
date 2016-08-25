(function() {
  'use strict';
  angular.module('module.controller.dashboard', [])
    .controller('controller.dashboard', controllerDashboard); 
    controllerDashboard.$inject=[
      '$scope',
      '$resourceService',
      '$state',
      'serviceStorage'
    ];

    function controllerDashboard($scope,$resourceService,$state,serviceStorage) {
      var imagePath = 'https://trello-avatars.s3.amazonaws.com/8e19c573c63d0ff0a4be0fe5c352891b/170.png';
      $scope.todos = [
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          face : imagePath,
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
      ];
      $scope.notifications = [
        {
          user: 'super user',
          text: 'Lorem ipsum dolor',
          time: '14:30'
        },
        {
          user: 'super user',
          text: 'Lorem ipsum dolor',
          time: '14:30'
        }
      ];
    }
    
})();