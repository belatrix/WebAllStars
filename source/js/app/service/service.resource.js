(function() {
	'use strict';
	angular.module('module.service.resource', [])

	.service('$resourceService', ['resourceServiceConfig', '$resource', function (config, $resource) {

			this.request=function(url){
				console.log("En teoria llamando al servicio");
				var resource = $resource(config.remoteURL + config[url].url,
										config[url].params,
										config[url].actions,
										config[url].options);

				return resource;
				
			};

			this.request_get=function(url){
				console.log("En teoria llamando al servicio2222222222");
				var resource = $resource(config.remoteURL + config[url].url,
										config[url].actions);

				return resource;
				
			};
			

	}]);

})();