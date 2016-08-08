(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular
    .module('module.service.storage',[])
    .service('serviceStorage', serviceStorage);

    serviceStorage.$inject = ['$sessionStorage'];

    function serviceStorage($sessionStorage) {

      this.setData = function(name,data){
        $sessionStorage[name] = data;
      };

      this.getData = function(name){
         return $sessionStorage[name];
      };

      this.deleteData = function(name){

         delete $sessionStorage[name];
      
      };

      this.data = {};

    }

}(angular));