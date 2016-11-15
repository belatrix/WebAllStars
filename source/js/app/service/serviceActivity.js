
(function() {
	'use strict';
	angular.module('module.service').service('activityService', [
		'$resourceService',
		'serviceStorage',
		'$state',
		function ($resourceService, serviceStorage, $state) {

			this.empĺoyee = {
        list: function (query,fnSuccess,fnError) {
  				var employeeList = $resourceService.request('employeeList');
  				return employeeList.get(query,fnSuccess,fnError);
  			}
      };

	}]);

})();
