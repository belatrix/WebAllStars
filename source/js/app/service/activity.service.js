
(function() {
	'use strict';
	angular.module('module.service.activity', [])

	.factory('activityService', activityService);
	activityService.$inject = ['$resourceService','storageService','$state'];
		function activityService($resourceService, storageService, $state) {

	    return {
          list: list
        };

        function list(query,fnSuccess,fnError) {
  			var employeeList = $resourceService.request('employeeList');
  			return employeeList.get(query,fnSuccess,fnError);

        }

	}

})();
