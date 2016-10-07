(function() {
	'use strict';
	angular.module('module.service.category', [])

	.service('categoryService', [
		'$resourceService',
		'serviceStorage',
		'$state',
		function ($resourceService, serviceStorage, $state) {

			this.category = {
		        list: function (query,fnSuccess,fnError) {
		  				var categoryList = $resourceService.request('categoryList');
		  				return categoryList.get(query,fnSuccess,fnError);
		  		},
		  		updateBlock:function (query,fnSuccess,fnError) {
		  				var updateBlock = $resourceService.request('updateBlockEmployee');
		  				return updateBlock.post(query,fnSuccess,fnError);
		  		}
		    };
	}]);

})();
