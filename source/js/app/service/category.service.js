(function() {
    'use strict';
    angular.module('module.service').factory('categoryService', categoryService);

    categoryService.$inject = ['$state', '$resourceService', 'storageService'];

    function categoryService($state, $resourceService, storageService) {
        return {
            category: {
                list: list,
                update_category: update_category,
                register_category: register_category,
                delete_category: delete_category,
                list_sub_category: list_sub_category,
                register_sub_category: register_sub_category,
                update_sub_category: update_sub_category,
                updateBlock: updateBlock,
                addSubCategory: addSubCategory
            }
        };

        function list(query, fnSuccess, fnError) {
            var categoryList = $resourceService.request('categoryList');
            return categoryList.get(query, fnSuccess, fnError);
        }

        function update_category(query, fnSuccess, fnError) {
            var updateCategory = $resourceService.request('updateCategory');
            return updateCategory.put(query, fnSuccess, fnError);
        }

        function register_category(query, fnSuccess, fnError) {
            var registerCategory = $resourceService.request('registerCategory');
            return registerCategory.post(query, fnSuccess, fnError);
        }

        function delete_category(query, fnSuccess, fnError) {
            var deleteCategory = $resourceService.request('deleteCategory');
            return deleteCategory.delete(query, fnSuccess, fnError);
        }

        function list_sub_category(query, fnSuccess, fnError) {
            var subCategoryList = $resourceService.request('subCategoryList');
            return subCategoryList.get(query, fnSuccess, fnError);
        }

        function register_sub_category(query, fnSuccess, fnError) {
            var registerSubCategory = $resourceService.request('registerSubCategory');
            return registerSubCategory.post(query, fnSuccess, fnError);
        }

        function update_sub_category(query, fnSuccess, fnError) {
            var updateSubCategory = $resourceService.request('updateSubCategory');
            return updateSubCategory.put(query, fnSuccess, fnError);
        }

        function updateBlock(query, fnSuccess, fnError) {
            var updateBlock = $resourceService.request('updateBlockEmployee');
            return updateBlock.post(query, fnSuccess, fnError);
        }

        function addSubCategory(query, fnSuccess, fnError) {
            var addSubCategory = $resourceService.request('addSubCategory');
            return addSubCategory.patch(query, fnSuccess, fnError);
        }
    }

})();
