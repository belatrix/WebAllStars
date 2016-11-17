(function() {
    'use strict';
    angular.module('module.service').factory('loginService', loginService);

    loginService.$inject = ['$state', '$resourceService', 'serviceStorage'];

    function loginService($state, $resourceService, serviceStorage) {
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
            serviceStorage.deleteData('token');
            $state.go('login');
        }

    }

})();
