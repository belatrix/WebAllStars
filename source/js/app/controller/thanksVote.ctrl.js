(function() {
  'use strict';
  angular.module('module.controller.thanksVote', [])
    .config(function($stateProvider){
      $stateProvider.state('thanksVote', {
          parent: 'root',
          url: "/thanksVote/:pk/:name/:votes",
          templateUrl: "views/thanksVote.html",
          controller: "controller.thanksVote"
      });
    })
    .controller('controller.thanksVote', thanksVote); 

      thanksVote.$inject=[
        '$scope',
      	'$stateParams',
        '$resourceService'
      ];

    function thanksVote($scope, $stateParams) {
      $scope.detail = $stateParams;
    }
    
})();