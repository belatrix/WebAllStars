(function() {
	'use strict';
	angular.module('module.service')

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
		  		update_category:function (query,fnSuccess,fnError) {
		  				var updateCategory = $resourceService.request('updateCategory');
		  				return updateCategory.put(query,fnSuccess,fnError);
		  		},
		  		register_category:function (query,fnSuccess,fnError) {
		  				var registerCategory = $resourceService.request('registerCategory');
		  				return registerCategory.post(query,fnSuccess,fnError);
		  		},
		  		delete_category:function (query,fnSuccess,fnError) {
		  				var deleteCategory = $resourceService.request('deleteCategory');
		  				return deleteCategory.delete(query,fnSuccess,fnError);
		  		},
		  		list_sub_category:function (query,fnSuccess,fnError) {
		  				var subCategoryList = $resourceService.request('subCategoryList');
		  				return subCategoryList.get(query,fnSuccess,fnError);
		  		},
		  		register_sub_category:function (query,fnSuccess,fnError) {
		  				var registerSubCategory = $resourceService.request('registerSubCategory');
		  				return registerSubCategory.post(query,fnSuccess,fnError);
		  		},
		  		update_sub_category:function (query,fnSuccess,fnError) {
		  				var updateSubCategory = $resourceService.request('updateSubCategory');
		  				return updateSubCategory.put(query,fnSuccess,fnError);
		  		},
		  		updateBlock:function (query,fnSuccess,fnError) {
		  				var updateBlock = $resourceService.request('updateBlockEmployee');
		  				return updateBlock.post(query,fnSuccess,fnError);
		  		},
		  		addSubCategory:function (query,fnSuccess,fnError) {
		  				var addSubCategory = $resourceService.request('addSubCategory');
		  				return addSubCategory.patch(query,fnSuccess,fnError);
		  		}
		    };
	}]);

})();
