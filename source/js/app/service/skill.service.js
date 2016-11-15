(function() {
	'use strict';
	angular.module('module.service.skill', [])

		.factory('skillService', skillService);
		skillService.$inject = 	['$resourceService','serviceStorage','$state'];

			function skillService($resourceService, serviceStorage, $state) {

                return {
                    list: list,
                    updateState: updateState,
                    create: create,
                    delete: delete_,
                    listByEmployeeId: listByEmployeedId
                };

                function list(query,fnSuccess,fnError) {
                    var skillList = $resourceService.request('skillList');
                    return skillList.query(query,fnSuccess,fnError);
                }

                function updateState(query,fnSuccess,fnError) {
                    var updateState = $resourceService.request('updateSkillState');
                    return updateState.put(query,fnSuccess,fnError);
                }

                function create(query,fnSuccess,fnError) {
                    var create = $resourceService.request('createSkill');
                    return create.post(query,fnSuccess,fnError);
                }

                function delete_(query, fnSuccess, fnError) {
                    var deleteKeyword = $resourceService.request('delete');
                    return deleteKeyword.delete(query, fnSuccess, fnError);
                }

                function listByEmployeedId(query, fnSuccess, fnError) {
                    var skillsList = $resourceService.request('getSkillsByEmployeeId');
                    return skillsList.get(query, fnSuccess, fnError);

                }

            }
})();