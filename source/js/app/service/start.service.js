
(function() {
	'use strict';
	angular.module('module.service.start', [])

	.factory('startService', startService);
	startService.$inject = ['storageService','$resourceService','$state'];

		function startService(storageService, $resourceService, $state) {

			return {
				list: list
			};

            /** Get recommendations associated with a particular employee */
			function list(query,fnSuccess,fnError) {
				var startList = $resourceService.request('getStartsByEmployeeId');

				return startList.get(query,fnSuccess,fnError);
			}


	}
})();
