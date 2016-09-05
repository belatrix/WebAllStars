
(function() {
	'use strict';

	angular
		.module('app.common')
		.factory('resourceService', resourceService);

	resourceService.$inject = [
		'$resource',
		'resourceServiceConfig'
	];

	function resourceService($resource,
							 resourceServiceConfig) {

	 	var service = {
			request: request
		};
		return service;

		function request(url) {

			var resource = $resource(
				resourceServiceConfig.remoteURL + resourceServiceConfig[url].url,
				resourceServiceConfig[url].params,
				resourceServiceConfig[url].actions,
				resourceServiceConfig[url].options
			);

			return resource;
		}

	}

})();
