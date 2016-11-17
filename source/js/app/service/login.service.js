(function() {
    'use strict';
    angular.module('module.service').factory('loginService', loginService);

    loginService.$inject = ['$state', '$resourceService', 'storageService'];

    function loginService($state, $resourceService, storageService) {
        return {
            signIn: signIn,
            logOut: logOut
        };

        function signIn(query, fnSuccess, fnError) {
            console.log("***" + query.username + "***" + query.password);
            var auth = $resourceService.request('auth');
            return auth.post(query, fnSuccess, fnError);
        }

        function logOut() {
            storageService.deleteData('token');
            $state.go('login');
        }

    }

})();
