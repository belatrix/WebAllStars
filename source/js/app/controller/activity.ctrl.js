(function() {
  'use strict';
  angular.module('module.controller.activity', [])
    .controller('controller.activity', controllerActivity);

    controllerActivity.$inject=[
    	'$scope',
      'activityService'
    ];

    function controllerActivity($scope, activityService) {

      activityService.employee.list(function (response) {

        console.log(response.results);

      }, function (error) {

      })

      var imagePath = 'https://trello-avatars.s3.amazonaws.com/8e19c573c63d0ff0a4be0fe5c352891b/170.png';

      $scope.selected = null;
      $scope.searchText = '';
      $scope.users = [
        {
          avatar : imagePath,
          name: 'Anthony Rojas',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands",
          notifications : [
            {
              user: 'super user',
              text: 'Lorem ipsum dolor',
              date: '14:30'
            },
            {
              user: 'super user',
              text: 'Lorem ipsum dolor',
              date: '14:30'
            }
          ]
        },
        {
          avatar : imagePath,
          name: 'Juan Perez',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands",
          notifications : [
            {
              user: 'super user Juan',
              text: 'Lorem ipsum dolor',
              date: '14:31'
            },
            {
              user: 'super user',
              text: 'Lorem ipsum dolor',
              date: '14:30'
            }
          ]
        },
        {
          avatar : imagePath,
          name: 'Fernando Tong',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          avatar : imagePath,
          name: 'Juan Jara',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          avatar : imagePath,
          name: 'Judith Condor',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands",
          notifications : [
            {
              user: 'super user',
              text: 'Lorem ipsum dolor',
              date: '14:30'
            },
            {
              user: 'super user',
              text: 'Lorem ipsum dolor',
              date: '14:30'
            }
          ]
        },
      ];

      $scope.selected = $scope.users[0];
      $scope.selectUser = function (user) {
        $scope.selected = user;
      }

    }

})();
