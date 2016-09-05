(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('storageService', storageService);

    storageService.$inject = ['$sessionStorage'];

    /* @ngInject */
    function storageService($sessionStorage) {
        var data = {};

        var service = {
            deleteData: deleteData,
            getData: getData,
            setData: setData
        };

        return service;

        function setData(name, data) {
          $sessionStorage[name] = data;
        }

        function getData(name) {
           return $sessionStorage[name];
        }

        function deleteData(name) {
           delete $sessionStorage[name];
        }

    }
})();
