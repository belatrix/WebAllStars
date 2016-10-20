(function() {
  'use strict';
  angular.module('module.controller.category', [])
    .controller('controller.category', controllerCategory);

    controllerCategory.$inject=[
        '$scope',
        '$resourceService',
        '$state',
        'categoryService',
        'serviceStorage',
        '$mdDialog',
        '$mdToast',
        '$q', '$timeout'
    ];

    function controllerCategory($scope,$resourceService,$state,categoryService,serviceStorage,$mdDialog,$mdToast,$q, $timeout) {
      var cachedQuery,lastSearch;
      var pendingSearch,cancelSearch = angular.noop;      
      $scope.asyncSubCategories = [];
      $scope.querySearch = querySearch;
      $scope.delayedQuerySearch = delayedQuerySearch;

      $scope.update_category_edit=true;
      $scope.chipsSubCategories = true;
      // -- Category
      var listCategory=function(){
        categoryService.category.list(null,function (response) {
          var array_category=[];  
          var i=0;
          var array_sub_categories = [];
          for(var i=0;i<response.length;i++){
            //-- Only active Category
            if(response[i].is_active == true){
              var detail_category=response[i];
              array_category.push(detail_category);  
            }
          }
          $scope.selected = null;
          $scope.category_list = array_category;
          $scope.selected = $scope.category_list[1];
          $scope.selectCategory($scope.category_list[1]);
        },function (error) {
            showError(error);
        });
      }

      $scope.showAddCategory=function(){
        $scope.addCategoryModel=true;
        $scope.btnAddCategory=false;
      }

      $scope.hideShowCategory=function(){
        $scope.addCategoryModel = false;
        $scope.btnAddCategory = true;
      }

      $scope.selectCategory = function (category) {
        $scope.listSubCategory(category.subcategories);
        $scope.selected = category;
      }

      $scope.showEditCategory=function(category){
        category.update_category=true;
        category.update_category_accept=true;
        category.update_category_edit=true;        
      }
      $scope.hideEditCategory=function(category){
        category.update_category=false;
        category.update_category_accept=false;
        category.update_category_edit=false;        
      }
      $scope.saveCategory=function(newCategory){
        categoryService.category.register_category({name : newCategory},function (response) {
            showSimpleToast("EXITO. Se agregó el nuevo Rol correctamente");
            listCategory();
        },function (error) {
          console.log("Error : "+error);
        });
        $scope.addCategoryModel=false;
      }

      $scope.updateCategory=function(ev,category,new_value){
        if (new_value!=null) {
          $scope.showConfirm(ev,category,'Actualización','¿Estas seguro que deseas actualizar la categoria '+category.name+' a '+new_value+'?','update_category',new_value);
        }       
      }

      $scope.callUpdateCategoryService=function(category,newValue){
        categoryService.category.update_category({category_id : category.pk ,name : newValue},function (response) {
          showSimpleToast("EXITO. Se actualizó correctamente el Rol "+newValue);
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
        category.update_category=false;
      }

      //-- List Sub Category
      $scope.listSubCategory=function(sub_categories){
        categoryService.category.list_sub_category(null,function (response) {
          var array_category=[];  
          var i=0;
          for(var i=0;i<response.length;i++){
            var detail_sub_category=response[i];
            if(search(detail_sub_category.pk,sub_categories) == false){
              detail_sub_category._lowername = detail_sub_category.name.toLowerCase();
              array_category.push(detail_sub_category);
            }        
          }
          $scope.listSubCategories = array_category;
        },function (error) {
            showError(error);
        });
      }

      function search(nameKey, myArray){
        var result =false;
          for (var i=0; i < myArray.length; i++) {
              if (myArray[i].pk === nameKey) {
                  result=true;
              }
          }
          return result;
      }

      $scope.showAddSubCategory=function(){
        $scope.addSubCategoryModel=true;
        $scope.btnAddSubCategory=false;
        $scope.chipsSubCategories = false;
      }

      $scope.hideShowSubCategory=function(subCategory){
        $scope.addSubCategoryModel=false;
        $scope.btnAddSubCategory=true; 
        $scope.chipsSubCategories = true;     
      }

      $scope.showEditSubCategory=function(subCategory){
        subCategory.update_subcategory=true;
        subCategory.update_sub_category_accept=true;
        subCategory.update_sub_category_edit=true;        
      }
      
      $scope.hideEditSubCategory=function(subCategory){
        subCategory.update_subcategory=false;
        subCategory.update_sub_category_accept=false;
        subCategory.update_sub_category_edit=false;        
      }

      $scope.hideEditSubCategory=function(subCategory){
        subCategory.update_subcategory=false;
        subCategory.update_sub_category_accept=false;
        subCategory.update_sub_category_edit=false;        
      }  

      $scope.clearAllSubCategories=function(ev){
        $scope.showConfirm(ev,null,'Confirmación','¿Estas seguro que deseas limpiar todo?','clear_sub_categories',null);
      }  

      $scope.clearAllSubCategories=function(ev){
        $scope.showConfirm(ev,null,'Confirmación','¿Estas seguro que deseas limpiar todo?','clear_sub_categories',null);
      }  

      $scope.saveSubCategories=function(ev,category){
        $scope.showConfirm(ev,category,'Confirmación','¿Estas seguro que deseas agregar estas Sub Categorias a este Rol?','add_sub_categories',null);
      } 

      $scope.showConfirm = function(ev,category,title,body,event,newValue) {
        var confirm = $mdDialog.confirm()
              .title(title)
              .textContent(body)
              .targetEvent(ev)
              .ok('Si')
              .cancel('No');
        $mdDialog.show(confirm).then(function() {
          if(event == 'delete_category'){
            $scope.callDeleteCategoryService(category);
          }else if(event == 'update_category'){
            $scope.callUpdateCategoryService(category,newValue);
          }else if(event == 'update_sub_category'){
            $scope.callUpdateSubCategoryService(category,newValue);
          }else if(event == 'clear_sub_categories'){
            $scope.asyncSubCategories=[];
          }else if(event == 'add_sub_categories'){
            $scope.callAddSubCategoryService(category);
          }else if(event == 'delete_sub_category'){
            $scope.callDeleteSubCategoryService(category,newValue);
          }
        }, function() {
          
        });
      };

      $scope.callDeleteSubCategoryService=function(category,subcategory){
        var id_sub_category =[];
        for(var i=0;i<category.subcategories.length;i++){
          if(category.subcategories[i].pk != subcategory.pk){
            id_sub_category.push(category.subcategories[i].pk);
          }
        }
        categoryService.category.addSubCategory({category_id : category.pk, subcategories:id_sub_category},function (response) {
          showSimpleToast("EXITO. Se retiró correctamente la categoria"+subcategory.name+" del Rol "+category.name);
          $scope.asyncSubCategories=[];
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
      }

      $scope.callAddSubCategoryService=function(category){
        var id_sub_category =[];
        for(var i=0;i<$scope.asyncSubCategories.length;i++){
          id_sub_category.push($scope.asyncSubCategories[i].pk);
        }
        for(var i=0;i<category.subcategories.length;i++){
          id_sub_category.push(category.subcategories[i].pk);
        }
        categoryService.category.addSubCategory({category_id : category.pk, subcategories:id_sub_category},function (response) {
          showSimpleToast("EXITO. Se agregó las nuevas categorias al Rol  : "+category.name);
          $scope.asyncSubCategories=[];
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
      }

      function querySearch (criteria) {
        cachedQuery = cachedQuery || criteria;
        return cachedQuery ? $scope.listSubCategories.filter(createFilterFor(cachedQuery)) : [];       
      }

      function delayedQuerySearch(criteria) {
        console.log("Entre");
        cachedQuery = criteria;
        if ( !pendingSearch || !debounceSearch() )  {
          cancelSearch();
          return pendingSearch = $q(function(resolve, reject) {
            cancelSearch = reject;
            $timeout(function() {
              resolve( querySearch());
              refreshDebounce();
            }, Math.random() * 500, true)
          });
        }
        return pendingSearch;
      }

      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
          return (contact._lowername.indexOf(lowercaseQuery) != -1);;
        };
      }

      function refreshDebounce() {
        lastSearch = 0;
        pendingSearch = null;
        cancelSearch = angular.noop;
      }

      function debounceSearch() {
        var now = new Date().getMilliseconds();
        lastSearch = lastSearch || now;
        return ((now - lastSearch) < 300);
      }
     
      $scope.btnAddCategory=true;
      $scope.btnAddSubCategory=true;
      listCategory();
      
      var showError=function(error){
        showSimpleToast("ERROR EN EL PROCESO. Status : "+error.status+", "+error.statusText);
      }     
   
      $scope.saveSubCategory=function(newSubCategory,category){
        $scope.addSubCategoryModel=false;
        categoryService.category.register_sub_category({name : newSubCategory},function (response) {
            showSimpleToast("EXITO. Se agregó la nueva categoria");
            $scope.selectCategory(category);
            $scope.btnAddSubCategory=true;
            $scope.chipsSubCategories = true;
        },function (error) {
          console.log("Error : "+error);
        });
      }

      $scope.updateSubCategory=function(ev,subcategory,new_value){
        $scope.showConfirm(ev,subcategory,'Confirmación','¿Estas seguro que deseas actualizar la sub-categoria '+subcategory.name+' a '+new_value+'?','update_sub_category',new_value);
      }
      
      $scope.callUpdateSubCategoryService=function(category,newValue){
        //-- Call Update Service
        categoryService.category.update_sub_category({subcategory_id : category.pk ,name : newValue},function (response) {
          showSimpleToast("EXITO. Se actualizó correctamente la categoria : "+newValue);
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
        category.update_category=false;
      }

      $scope.deleteSubCategory=function(ev,category,subcategory){
        $scope.showConfirm(ev,category,'Confirmación','¿Deseas remover la categoria '+subcategory.name+' del Rol '+category.name+' ?','delete_sub_category',subcategory);
      }

      $scope.deleteCategory=function(ev,category){
        $scope.showConfirm(ev,category,'Confirmación','¿Estas seguro que deseas dar de baja el Rol '+category.name+' ?','delete_category','');
      }

      $scope.callDeleteCategoryService=function(category){
        //-- Call Delete category
        categoryService.category.delete_category({category_id : category.pk},function (response) {
          showSimpleToast("EXITO. Se dio de baja al Rol : "+category.name);
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
      }
      
      var showSimpleToast = function(messages) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(messages)
            .position('bottom right' )
            .hideDelay(3000)
        );
      };      
    }
})();