
(function() {
	'use strict';
	angular.module('module.service.start', [])

	.service('startService', ['serviceStorage','$resourceService','$state',
		function (serviceStorage, $resourceService, $state) {
			/** Get recommendations associated with a particular employee */
			this.getStartsByEmployeeId = {
        		list: function (query,fnSuccess,fnError) {
  					var startList = $resourceService.request('getStartsByEmployeeId');

  					return startList.get(query,fnSuccess,fnError);
  				}
      		};

	}]);
})();
