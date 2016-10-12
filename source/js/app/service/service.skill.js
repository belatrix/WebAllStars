(function() {
	'use strict';
	angular.module('module.service.skill', [])

	.service('skillService', [
		'$resourceService',
		'serviceStorage',
		'$state',
		function ($resourceService, serviceStorage, $state) {

			/** Get the list of skills by employee_Id */
			this.getSkillsList = {
		        skillsList: function (query, fnSuccess, fnError) {
					var skillsList = $resourceService.request('skillsById');

					return skillsList.get(query, fnSuccess, fnError);
				}
		    };
	}]);

})();
