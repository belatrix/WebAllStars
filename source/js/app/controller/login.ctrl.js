(function() {
    'use strict';
    angular.module('module.controller').controller('controller.login', controllerLogin);

    controllerLogin.$inject = ['$scope', '$state', '$resourceService', 'loginService', 'storageService'];

    function controllerLogin($scope, $state, $resourceService, loginService, storageService) {

        $scope.loading = false;

        $scope.getSignIn = getSignIn;

        function getSignIn(user) {
            $scope.loading = true;

            loginService.signIn(user, function(data) {
                console.log("Token : " + data.token);
                storageService.setData('token', data.token);
                $state.go('coworkers');
            }, function() {
                $scope.loading = false;
            });
        }

    }

})();
