
(function() {
	'use strict';
	angular.module('module.service')

	.service('loginService', [
		'$resourceService',
		'serviceStorage',
		'$state',
		function ($resourceService, serviceStorage, $state) {

			this.signIn = function (query,fnSuccess,fnError) {
				console.log("***"+query.username+"***"+query.password);
				var auth = $resourceService.request('auth');
				return auth.post(query,fnSuccess,fnError);
			};

			this.logOut = function () {
				serviceStorage.deleteData('token');
				$state.go('login');
			}

	}]);

})();
