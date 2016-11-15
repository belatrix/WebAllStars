(function() {
    'use strict';
    angular.module('module.controller').controller('controller.login', controllerLogin);

    controllerLogin.$inject = ['$scope', '$state', '$resourceService', 'loginService', 'serviceStorage'];

    function controllerLogin($scope, $state, $resourceService, loginService, serviceStorage) {

        $scope.loading = false;

        $scope.getSignIn = getSignIn;

        function getSignIn(user) {
            $scope.loading = true;

            loginService.signIn(user, function(data) {
                console.log("Token : " + data.token);
                serviceStorage.setData('token', data.token);
                $state.go('coworkers');
            }, function() {
                $scope.loading = false;
            });
        }

    }

})();
