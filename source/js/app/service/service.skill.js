(function() {
	'use strict';
	angular.module('module.service.skill', [])

		.service('skillService', [
			'$resourceService',
			'serviceStorage',
			'$state',
			function ($resourceService, serviceStorage, $state) {

				this.skills = {
					list: function (query,fnSuccess,fnError) {
						var skillList = $resourceService.request('skillList');
						return skillList.query(query,fnSuccess,fnError);
					},
					updateState: function (query,fnSuccess,fnError) {
						var updateState = $resourceService.request('updateSkillState');
						return updateState.put(query,fnSuccess,fnError);
					},
					create: function (query,fnSuccess,fnError) {
						var create = $resourceService.request('createSkill');
						return create.post(query,fnSuccess,fnError);
					},
					delete: function (query, fnSuccess, fnError) {
						var deleteKeyword = $resourceService.request('delete');
						return deleteKeyword.delete(query, fnSuccess, fnError);
					}
				};
				/** Get the list of skills by employee_Id */
				this.getSkillsByEmployeeId = {
					list: function (query, fnSuccess, fnError) {
						var skillsList = $resourceService.request('getSkillsByEmployeeId');

						return skillsList.get(query, fnSuccess, fnError);
					}

				};
			}]);
})();
