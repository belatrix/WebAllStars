(function() {
	'use strict';

	angular
        .module('app.authentication')
	    .factory('loginService', loginService);

    loginService.$inject = [
		'$q',
		'$log',
		'resourceServiceConfig',
		'storageService',
		'requestService'
	];

    function loginService($q,
						  $log,
						  resourceServiceConfig,
						  storageService,
					  	  requestService) {
        var service = {
			logOut: logOut,
            signIn: signIn
        };
        return service;

		function logOut() {
			storageService.deleteData('token');
		}

		/**
		 * Sign In the application
		 *
		 * @param {Object} data
		 *
		 * @returns {Promise}
		 */
		function signIn(data) {
			var deferred = $q.defer(),
				promise;

			promise = requestService.post(
				resourceServiceConfig.remoteURL + resourceServiceConfig.endpoints.auth,
				resourceServiceConfig.endpoints.authOptions,
				data
			);

			promise.then(function (response) {
				console.log(JSON.stringify(response));
				deferred.resolve(response);
			});
			return deferred.promise;
		}
    }

})();
