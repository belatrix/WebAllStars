
(function() {
	'use strict';
	angular.module('module.service.login', [])

	.factory('loginService', loginService);
	loginService.$inject = ['$resourceService','storageService','$state'];

	function loginService($resourceService, storageService, $state) {

        return {
           signIn: signIn,
           logOut: logOut
        };

		function signIn(query,fnSuccess,fnError) {
			var auth = $resourceService.request('auth');
			return auth.post(query,fnSuccess,fnError);
		}

		function logOut() {
			storageService.deleteData('token');
			$state.go('login');
		}

	}

})();
