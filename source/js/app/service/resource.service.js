(function() {
    'use strict';
    angular.module('module.service').factory('$resourceService', $resourceService);

    $resourceService.$inject = ['$resource', 'config'];

    function $resourceService($resource, config) {
        return {
            request: request
        }

        function request(url) {
            return $resource(
                config.remoteURL + config[url].url,
                config[url].params,
                config[url].actions,
                config[url].options
            );
        }
    }

})();
