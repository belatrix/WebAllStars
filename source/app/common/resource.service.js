
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

			var resource = $resource(config[url].url,
									config[url].params,
									config[url].actions,
									config[url].options);

			return resource;
		}

	}

})();
