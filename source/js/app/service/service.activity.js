
(function() {
	'use strict';
	angular.module('module.service.activity', [])

	.service('activityService', [
		'$resourceService',
		'serviceStorage',
		'$state',
		function ($resourceService, serviceStorage, $state) {

      		this.getMessageByEmployeeId = {
		        list: function (query, fnSuccess, fnError) {
					var listEmployeeMessage = $resourceService.request('getMessageByEmployeeId');

					return listEmployeeMessage.get(query, fnSuccess, fnError);
				}

			};

	}]);

})();
