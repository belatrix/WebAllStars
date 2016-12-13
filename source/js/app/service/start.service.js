(function() {
    'use strict';
    angular.module('module.service').factory('startService', startService);

    startService.$inject = ['$state', '$resourceService', 'storageService'];

    function startService($state, $resourceService, storageService) {
        return {
            list: list
        };

        /** Get recommendations associated with a particular employee */
        function list(query, fnSuccess, fnError) {
            var startList = $resourceService.request('getStartsByEmployeeId');
            return startList.get(query, fnSuccess, fnError);
        }
    }
})();
