(function() {
	'use strict';
	angular.module('module.service.resource', [])

	.factory('$resourceService', resourceService);
	resourceService.$inject = ['resourceServiceConfig', '$resource'];

	function resourceService(config, $resource) {

		return {
			request: request
		};
		function request(url){
			return $resource(config.remoteURL + config[url].url,
				config[url].params,
				config[url].actions,
				config[url].options);
		}
	}

})();