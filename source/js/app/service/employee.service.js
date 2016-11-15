(function() {
	'use strict';
	angular.module('module.service.employee', [])

	.factory('employeeService', employeeService);
	employeeService.$inject = 	['$resourceService','storageService','$state'];
	function employeeService($resourceService, storageService, $state) {
				return {
						list: list,
						updateBlock: updateBlock,
						user: user
				};

				function list(query,fnSuccess,fnError) {
					var employeeList = $resourceService.request('employeeList');
					return employeeList.get(query,fnSuccess,fnError);
				}

				function updateBlock(query,fnSuccess,fnError) {
						var updateBlock = $resourceService.request('updateBlockEmployee');
						return updateBlock.post(query,fnSuccess,fnError);
				}

				function user(query, fnSuccess, fnError) {
						var user = $resourceService.request('getEmployeeById');
						return user.get(query, fnSuccess, fnError);
				}
	}
})();
