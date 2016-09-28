(function() {
	'use strict';
	angular.module('module.service.coworkers', [])

	.service('coworkersService', [
		'$resourceService',
		'serviceStorage',
		'$state',
		function ($resourceService, serviceStorage, $state) {

			this.listCoworkers = function (fnSuccess,fnError) {
				console.log("Entree....");
				var list_coworkers = $resourceService.request('list_coworkers');
				return list_coworkers.get(fnSuccess,fnError);
			}
	}]);

})();
