(function() {
	'use strict';
	angular.module('module.service')

	.service('$resourceService', ['resourceServiceConfig', '$resource', function (config, $resource) {

			this.request=function(url){
				var resource = $resource(config.remoteURL + config[url].url,
										config[url].params,
										config[url].actions,
										config[url].options);
				return resource;
			};
	}]);

})();
