
(function() {
	'use strict';
	angular.module('module.service.login', [])

	.service('loginService', [
		'$resourceService',
		'storageService',
		'$state',
		function ($resourceService, storageService, $state) {

			this.signIn = function (query,fnSuccess,fnError) {
				console.log("***"+query.username+"***"+query.password);
				var auth = $resourceService.request('auth');
				return auth.post(query,fnSuccess,fnError);
			};

			this.logOut = function () {
				storageService.deleteData('token');
				$state.go('login');
			}

	}]);

})();
