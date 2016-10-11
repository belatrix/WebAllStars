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
      
      $scope.update_category_edit=true;
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

      $scope.saveCategory=function(newCategory){
        console.log("New Category "+newCategory);
        categoryService.category.register_category({name : newCategory},function (response) {
            console.log("Success - Create");
            listCategory();
        },function (error) {
          console.log("Error : "+error);
        });
        $scope.addCategoryModel=false;
      }

      $scope.updateCategory=function(ev,category,new_value){
        console.log("Inside category with "+category.name+"**"+new_value);
        if (new_value!=null) {
          $scope.showConfirm(ev,category,'Actualización','¿Estas seguro que deseas actualizar la categoria '+category.name+' a '+new_value+'?','update_category',new_value);
        }       
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
            $scope.callUpdateSubCategoryService(category);
          }
        }, function() {
          
        });
      }; 

      $scope.callUpdateCategoryService=function(category,newValue){
        console.log("Ahora si a Actualizar");
        //-- Call Update Service
        console.log("Nuevo valir ;: "+newValue);
        categoryService.category.update_category({category_id : category.pk ,name : newValue},function (response) {
          console.log("Success - Update");
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
        category.update_category=false;
      }

     
      $scope.btnAddCategory=true;
      $scope.btnShowListSubCategory=true;
    
      var listCategory=function(){
        categoryService.category.list(null,function (response) {
          var array_category=[];  
          var i=0;
          for(var i=0;i<response.length;i++){
            var detail_category=response[i];
            array_category.push(detail_category);
          }
          $scope.selected = null;
          $scope.category_list = array_category;
          $scope.selected = $scope.category_list[0];
          stopWaitingEffect();
        }, function (error) {
            showError(error);
        });
      }

      listCategory();

      var onChange=function(user){
        categoryService.empĺoyee.updateBlock({employee_id : user.pk,action : user.is_blocked},function (response) {
        stopWaitingEffect();
        showSimpleToast('EXITO. Se actualizó el registro correctamente');
        },function (error) {
          if(user.is_blocked){
            user.is_blocked=false;
          }else{
            user.is_blocked=true;
          }
          
          showError(error);
        });
      }

      $scope.selectCategory = function (category) {
        console.log("Category selected : "+category.pk);
        $scope.selected = category;
      }


      var showSimpleToast = function(messages) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(messages)
            .position('top right' )
            .hideDelay(3000)
        );
      };

      var stopWaitingEffect=function(){
        $scope.loading=false;
      }
      
      var showError=function(error){
        showSimpleToast("ERROR EN EL PROCESO. Status : "+error.status+", "+error.statusText);
      }

      

      $scope.updateSubCategory=function(ev,category,new_value){
        console.log("Inside Sub Category with "+category.name+"**"+new_value);
        if (new_value!=null) {
          category.new_value=new_value;
          $scope.showConfirm(ev,category,'Actualización','¿Estas seguro que deseas actualizar la sub - categoria '+category.name+' a '+new_value+'?','update_sub_category',new_value);
        }

      }

      

      $scope.saveSubCategory=function(newSubCategory){
        console.log("New Category "+newSubCategory);
        $scope.addSubCategoryModel=false;
      }

      $scope.addCategory=function(){
        console.log("New Category ");
        $scope.addCategoryModel=true;
        $scope.btnAddCategory=false;
      }

      $scope.cancelCategory=function(){
        $scope.addCategoryModel = false;
        $scope.btnAddCategory = true;
      }

       $scope.cancelSubCategory=function(){
        $scope.addSubCategoryModel = false
        $scope.btnAddSubCategory = true;
      }

      $scope.addSubCategory=function(){
        console.log("New SubCategory ");
        $scope.addSubCategoryModel=true;
        $scope.btnAddSubCategory = false;
        
      }

      $scope.showListSubCategory=function(){
        console.log("List SubCategory ");
        $scope.listSubCategory=true;
        $scope.btnShowListSubCategory = false;
        
      }

      $scope.deleteSubCategory=function(ev,category){
        console.log("Delete SubCategory ");
        $scope.showConfirm(ev,category,'Confirmación','¿Estas seguro que deseas dar de baja a la  sub-categoria '+category.name+' ?','delete','');
      }

      $scope.deleteCategory=function(ev,category){
        console.log("Delete Category ");
        $scope.showConfirm(ev,category,'Confirmación','¿Estas seguro que deseas dar de baja la categoria '+category.name+' ?','delete_category','');
      }

      

      $scope.callDeleteCategoryService=function(category){
        console.log("Ahora si a borrar");
        //-- Call Delete category
        categoryService.category.delete_category({category_id : category.pk},function (response) {
          console.log("Success - Delete");
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
      }

      

      $scope.callUpdateSubCategoryService=function(category,newValue){
        console.log("Ahora si a Actualizar");
        //-- Call Update Service
        console.log("Nuevo valir ;: "+newValue);
        categoryService.category.update_category({category_id : category.pk ,name : newValue},function (response) {
          console.log("Success - Update");
          listCategory();
        }, function (error) {
          console.log("Error : "+error);
        });
        category.update_category=false;
      }
    }
})();
