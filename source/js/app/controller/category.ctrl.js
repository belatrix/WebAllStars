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

      $scope.showConfirm = function(ev,category) {
        var confirm = $mdDialog.confirm()
              .title('Confirmación')
              .textContent('¿Estas seguro que deseas dar de baja la categoria '+category.name+' ?')
              .targetEvent(ev)
              .ok('Si')
              .cancel('No');
        $mdDialog.show(confirm).then(function() {
        //onChange(user);
        }, function() {
          category.delete_category=false;
        });
      }; 
    }
})();
