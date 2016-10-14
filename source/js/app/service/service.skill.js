(function() {
	'use strict';
	angular.module('module.service.skill', [])

	.service('skillService', [
		'serviceStorage',
		'$resourceService',
		'$state',
		function (serviceStorage, $resourceService, $state) {

			/** Get the list of skills by employee_Id */
			this.getSkillsByEmployeeId = {
		        list: function (query, fnSuccess, fnError) {
					var skillsList = $resourceService.request('getSkillsByEmployeeId');

					return skillsList.get(query, fnSuccess, fnError);
				}
		    };
	}]);
})();
