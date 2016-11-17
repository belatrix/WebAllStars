(function() {
    'use strict';
    angular.module('module.service').service('activityService', activityService);

    categoryService.$inject = ['$state', '$resourceService', 'serviceStorage'];

    function activityService($state, $resourceService, serviceStorage) {
        return {
            empĺoyee: {
                list: list
            }
        };

        function list(query, fnSuccess, fnError) {
            var employeeList = $resourceService.request('employeeList');
            return employeeList.get(query, fnSuccess, fnError);
        }
    }
})();
