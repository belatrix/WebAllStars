
(function() {
	'use strict';
	angular.module('module.service.resource', [])

	.service('$resourceService', ['resourceServiceConfig', '$resource', function (config, $resource) {

			this.request=function(url){

				var resource = $resource(config[url].url,
										config[url].params,
										config[url].actions,
										config[url].options);

				return resource;
				
			};
			

	}]);

})();