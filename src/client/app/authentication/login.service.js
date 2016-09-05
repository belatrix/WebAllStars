(function() {
	'use strict';

	angular
        .module('app.authentication')
	    .factory('loginService', loginService);

    loginService.$inject = [
		'$log',
		'resourceService',
		'storageService'
	];

    function loginService($log,
						  resourceService,
						  storageService) {
        var service = {
			logOut: logOut,
            signIn: signIn
        };
        return service;

        function signIn(query, fnSuccess, fnError) {
            var auth = resourceService.request('auth');
            return auth.post(query,fnSuccess,fnError);
        }

		function logOut() {
			storageService.deleteData('token');
		}
    }

})();
