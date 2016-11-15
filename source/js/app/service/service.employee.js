(function() {
	'use strict';
	angular.module('module.service.employee', [])

	.service('employeeService', [
		'$resourceService',
		'storageService',
		'$state',
		function ($resourceService, storageService, $state) {

			this.empĺoyee = {
		        list: function (query,fnSuccess,fnError) {
		  				var employeeList = $resourceService.request('employeeList');
		  				return employeeList.get(query,fnSuccess,fnError);
		  		},
		  		updateBlock:function (query,fnSuccess,fnError) {
		  				var updateBlock = $resourceService.request('updateBlockEmployee');
		  				return updateBlock.post(query,fnSuccess,fnError);
		  		}
		    };

			/** Get an employee by employee_Id */
			this.getEmployeeById = {
		        user: function (query, fnSuccess, fnError) {
					var user = $resourceService.request('getEmployeeById');

					return user.get(query, fnSuccess, fnError);
				}
		    };
	}]);

})();
