(function() {
  'use strict';
  angular.module('module.controller.coworkers', [])
    .controller('controller.coworkers', controllerCoworkers);

    controllerCoworkers.$inject=[
        '$scope'
    ];

    function controllerCoworkers($scope) {
      var imagePath = 'https://trello-avatars.s3.amazonaws.com/8e19c573c63d0ff0a4be0fe5c352891b/170.png';
      $scope.active="Activo";
      $scope.selected = null;
      $scope.searchText = '';
      $scope.users = [
        {
          avatar : imagePath,
          name: 'Alberto Paico',
          when: '3:09PM',
          notes: " I'll be in your neighborhood doing errands",
          ubication: "Lima",
          recomendation: 80,
          is_blocked:true,
          avatar : "https://allstarsbx.s3.amazonaws.com/media/avatar/apaico1470693390.jpg"
        },
        {
          avatar : imagePath,
          name: 'Ruiz Diaz',
          when: '3:10PM',
          notes: " I'll be in your neighborhood doing errands",
          ubication: "Buenos Aires",
          recomendation: 90,
          is_blocked:true,
          avatar : "https://allstarsbx.s3.amazonaws.com/media/avatar/apaico1470693390.jpg"
        },
        {
          avatar : imagePath,
          name: 'Diego Guastavino',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands",
          ubication: "Mendoza",
          recomendation: 95,
          is_blocked:true,
          avatar : "https://allstarsbx.s3.amazonaws.com/media/avatar/apaico1470693390.jpg"
        },
        {
          avatar : imagePath,
          name: 'Jhon Galliquio',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands",
          ubication: "Lima",
          recomendation: 70,
          is_blocked:false,
          avatar : "https://allstarsbx.s3.amazonaws.com/media/avatar/apaico1470693390.jpg"
        },
        {
          avatar : imagePath,
          name: 'Jose Luis "El Puma" Carranza',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands",
          ubication: "Lima",
          recomendation: 75,
          is_blocked:false,
          avatar : "https://allstarsbx.s3.amazonaws.com/media/avatar/apaico1470693390.jpg"
        },
      ];

      $scope.selected = $scope.users[0];
      $scope.selectUser = function (user) {
        $scope.selected = user;
      }

      $scope.onChange = function(cbState) {
        if(cbState==true){
          $scope.active = "Activo";
        }else{
          $scope.active = "Inactivo";
        }
        
      };

    }

})();
