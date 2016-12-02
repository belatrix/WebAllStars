(function() {
    'use strict';
    angular.module('module.controller').controller('controller.category', categoryController);

    categoryController.$inject = ['$scope', '$q', '$timeout', '$state', '$mdDialog', '$mdToast', '$resourceService', 'categoryService', 'storageService'];

    function categoryController($scope, $q, $timeout, $state, $mdDialog, $mdToast, $resourceService, categoryService, storageService) {
        var cachedQuery = null;
        var vlastSearch = null;
        var pendingSearch = null;
        var cancelSearch = angular.noop;

        $scope.asyncSubCategories = [];
        $scope.update_category_edit = true;
        $scope.chipsSubCategories = true;
        $scope.btnAddCategory = true;
        $scope.btnAddSubCategory = true;

        $scope.querySearch = querySearch;
        $scope.delayedQuerySearch = delayedQuerySearch;
        $scope.showAddCategory = showAddCategory;
        $scope.hideShowCategory = hideShowCategory;
        $scope.selectCategory = selectCategory;
        $scope.showEditCategory = showEditCategory;
        $scope.hideEditCategory = hideEditCategory;
        $scope.saveCategory = saveCategory;
        $scope.updateCategory = updateCategory;
        $scope.callUpdateCategoryService = callUpdateCategoryService;
        $scope.listSubCategory = listSubCategory;
        $scope.showAddSubCategory = showAddSubCategory;
        $scope.hideShowSubCategory = hideShowSubCategory;
        $scope.showEditSubCategory = showEditSubCategory;
        $scope.hideEditSubCategory = hideEditSubCategory;
        $scope.clearAllSubCategories = clearAllSubCategories;
        $scope.saveSubCategories = saveSubCategories;
        $scope.showConfirm = showConfirm;
        $scope.callDeleteSubCategoryService = callDeleteSubCategoryService;
        $scope.callAddSubCategoryService = callAddSubCategoryService;
        $scope.saveSubCategory = saveSubCategory;
        $scope.updateSubCategory = updateSubCategory;
        $scope.callUpdateSubCategoryService = callUpdateSubCategoryService;
        $scope.deleteSubCategory = deleteSubCategory;
        $scope.deleteCategory = deleteCategory;
        $scope.callDeleteCategoryService = callDeleteCategoryService;

        _init();

        /*private functions*/
        function _init() {
            _listCategory();
        }

        function _listCategory() {
            categoryService.category.list(null, function(response) {
                var array_category = [];
                var array_sub_categories = [];
                var response_list = response.results;
                for (var i = 0; i < response_list.length; i++) {
                    //-- Only active Category
                    if (response_list[i].is_active === true) {
                        var detail_category = response_list[i];
                        array_category.push(detail_category);
                    }
                }
                $scope.selected = null;
                $scope.category_list = array_category;
                $scope.selected = $scope.category_list[1];
                $scope.selectCategory($scope.category_list[1]);
            }, function(error) {
                _showError(error);
            });
        }

        function _search(nameKey, myArray) {
            var result = false;
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].pk === nameKey) {
                    result = true;
                }
            }
            return result;
        }

        function _createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(contact) {
                return (contact._lowername.indexOf(lowercaseQuery) != -1);
            };
        }

        function _refreshDebounce() {
            lastSearch = 0;
            pendingSearch = null;
            cancelSearch = angular.noop;
        }

        function _debounceSearch() {
            var now = new Date().getMilliseconds();
            lastSearch = lastSearch || now;
            return ((now - lastSearch) < 300);
        }

        function _showError(error) {
            _showSimpleToast("ERROR EN EL PROCESO. Status : " + error.status + ", " + error.statusText);
        }

        function _showSimpleToast(messages) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(messages)
                .position('bottom right')
                .hideDelay(3000)
            );
        }
        /*end private functions*/

        /*public functions*/
        function delayedQuerySearch(criteria) {
            cachedQuery = criteria;
            if (!pendingSearch || !_debounceSearch()) {
                cancelSearch();
                pendingSearch = $q(function(resolve, reject) {
                    cancelSearch = reject;
                    $timeout(function() {
                        resolve(querySearch());
                        _refreshDebounce();
                    }, Math.random() * 500, true);
                });
            }
            return pendingSearch;
        }

        function querySearch(criteria) {
            cachedQuery = cachedQuery || criteria;
            return cachedQuery ? $scope.listSubCategories.filter(_createFilterFor(cachedQuery)) : [];
        }

        function showAddCategory() {
            $scope.addCategoryModel = true;
            $scope.btnAddCategory = false;
        }

        function hideShowCategory() {
            $scope.addCategoryModel = false;
            $scope.btnAddCategory = true;
        }

        function selectCategory(category) {
            $scope.listSubCategory(category.subcategories);
            $scope.selected = category;
        }

        function showEditCategory(category) {
            category.update_category = true;
            category.update_category_accept = true;
            category.update_category_edit = true;
        }

        function hideEditCategory(category) {
            category.update_category = false;
            category.update_category_accept = false;
            category.update_category_edit = false;
        }

        function saveCategory(newCategory) {
            categoryService.category.register_category({
                name: newCategory
            }, function(response) {
                _showSimpleToast("EXITO. Se agregó el nuevo Rol correctamente");
                _listCategory();
            }, function(error) {
                _showError(error);
            });
            $scope.addCategoryModel = false;
        }

        function updateCategory(ev, category, new_value) {
            if (new_value !== null) {
                $scope.showConfirm(ev, category, 'Actualización', '¿Estas seguro que deseas actualizar la categoria ' + category.name + ' a ' + new_value + '?', 'update_category', new_value);
            }
        }

        function callUpdateCategoryService(category, newValue) {
            categoryService.category.update_category({
                category_id: category.pk,
                name: newValue
            }, function(response) {
                _showSimpleToast("EXITO. Se actualizó correctamente el Rol " + newValue);
                _listCategory();
            }, function(error) {
                _showError(error);
            });
            category.update_category = false;
        }

        //-- List Sub Category
        function listSubCategory(sub_categories) {
            categoryService.category.list_sub_category(null, function(response) {
                var array_category = [];
                var result_sub_category = response.results;
                for (var i = 0; i < result_sub_category.length; i++) {
                    var detail_sub_category = result_sub_category[i];
                    if (_search(detail_sub_category.pk, sub_categories) === false) {
                        detail_sub_category._lowername = detail_sub_category.name.toLowerCase();
                        array_category.push(detail_sub_category);
                    }
                }
                $scope.listSubCategories = array_category;
            }, function(error) {
                _showError(error);
            });
        }

        function showAddSubCategory() {
            $scope.addSubCategoryModel = true;
            $scope.btnAddSubCategory = false;
            $scope.chipsSubCategories = false;
        }

        function hideShowSubCategory(subCategory) {
            $scope.addSubCategoryModel = false;
            $scope.btnAddSubCategory = true;
            $scope.chipsSubCategories = true;
        }

        function showEditSubCategory(subCategory) {
            subCategory.update_subcategory = true;
            subCategory.update_sub_category_accept = true;
            subCategory.update_sub_category_edit = true;
        }

        function hideEditSubCategory(subCategory) {
            subCategory.update_subcategory = false;
            subCategory.update_sub_category_accept = false;
            subCategory.update_sub_category_edit = false;
        }

        function clearAllSubCategories(ev) {
            $scope.showConfirm(ev, null, 'Confirmación', '¿Estas seguro que deseas limpiar todo?', 'clear_sub_categories', null);
        }

        function saveSubCategories(ev, category) {
            $scope.showConfirm(ev, category, 'Confirmación', '¿Estas seguro que deseas agregar estas Sub Categorias a este Rol?', 'add_sub_categories', null);
        }

        function showConfirm(ev, category, title, body, event, newValue) {
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(body)
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                switch (event) {
                    case 'delete_category':
                        callDeleteCategoryService(category);
                        break;
                    case 'update_category':
                        callUpdateCategoryService(category, newValue);
                        break;
                    case 'update_sub_category':
                        callUpdateSubCategoryService(category, newValue);
                        break;
                    case 'clear_sub_categories':
                        $scope.asyncSubCategories = [];
                        break;
                    case 'add_sub_categories':
                        callAddSubCategoryService(category);
                        break;
                    case 'delete_sub_category':
                        callDeleteSubCategoryService(category, newValue);
                        break;
                }
            }, function() {});
        }

        function callDeleteSubCategoryService(category, subcategory) {
            var id_sub_category = [];
            for (var i = 0; i < category.subcategories.length; i++) {
                if (category.subcategories[i].pk != subcategory.pk) {
                    id_sub_category.push(category.subcategories[i].pk);
                }
            }
            categoryService.category.addSubCategory({
                category_id: category.pk,
                subcategories: id_sub_category
            }, function(response) {
                _showSimpleToast("EXITO. Se retiró correctamente la categoria" + subcategory.name + " del Rol " + category.name);
                $scope.asyncSubCategories = [];
                _listCategory();
            }, function(error) {
                _showError(error);
            });
        }

        function callAddSubCategoryService(category) {
            var id_sub_category = [];
            for (var i = 0; i < $scope.asyncSubCategories.length; i++) {
                id_sub_category.push($scope.asyncSubCategories[i].pk);
            }
            for (i = 0; i < category.subcategories.length; i++) {
                id_sub_category.push(category.subcategories[i].pk);
            }
            categoryService.category.addSubCategory({
                category_id: category.pk,
                subcategories: id_sub_category
            }, function(response) {
                _showSimpleToast("EXITO. Se agregó las nuevas categorias al Rol  : " + category.name);
                $scope.asyncSubCategories = [];
                _listCategory();
            }, function(error) {
                _showError(error);
            });
        }

        function saveSubCategory(newSubCategory, category) {
            $scope.addSubCategoryModel = false;
            categoryService.category.register_sub_category({
                name: newSubCategory
            }, function(response) {
                _showSimpleToast("EXITO. Se agregó la nueva categoria");
                $scope.selectCategory(category);
                $scope.btnAddSubCategory = true;
                $scope.chipsSubCategories = true;
            }, function(error) {
                _showError(error);
            });
        }

        function updateSubCategory(ev, subcategory, new_value) {
            $scope.showConfirm(ev, subcategory, 'Confirmación', '¿Estas seguro que deseas actualizar la sub-categoria ' + subcategory.name + ' a ' + new_value + '?', 'update_sub_category', new_value);
        }

        function callUpdateSubCategoryService(category, newValue) {
            //-- Call Update Service
            categoryService.category.update_sub_category({
                subcategory_id: category.pk,
                name: newValue
            }, function(response) {
                _showSimpleToast("EXITO. Se actualizó correctamente la categoria : " + newValue);
                _listCategory();
            }, function(error) {
                console.log("Error : " + error);
            });
            category.update_category = false;
        }

        function deleteSubCategory(ev, category, subcategory) {
            $scope.showConfirm(ev, category, 'Confirmación', '¿Deseas remover la categoria ' + subcategory.name + ' del Rol ' + category.name + ' ?', 'delete_sub_category', subcategory);
        }

        function deleteCategory(ev, category) {
            $scope.showConfirm(ev, category, 'Confirmación', '¿Estas seguro que deseas dar de baja el Rol ' + category.name + ' ?', 'delete_category', '');
        }

        function callDeleteCategoryService(category) {
            //-- Call Delete category
            categoryService.category.delete_category({
                category_id: category.pk
            }, function(response) {
                _showSimpleToast("EXITO. Se dio de baja al Rol : " + category.name);
                _listCategory();
            }, function(error) {
                _showError(error);
            });
        }
        /*end public functions*/
    }
})();
