(function() {

	'use strict';

	angular
        .module('app.authentication', [])
	    .factory('loginService', loginService);

    loginService.$inject = ['resourceService'];

    function loginService(resourceService) {
        var service = {
            signIn: signIn
        };
        return service;

        function signIn(query, fnSuccess, fnError) {
            var auth = resourceService.request('auth');

            return auth.get(query,fnSuccess,fnError);
        }
    }

})();
