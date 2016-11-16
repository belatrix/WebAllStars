(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */
    angular.module('module.service').factory('serviceStorage', serviceStorage);

    serviceStorage.$inject = ['$sessionStorage'];

    function serviceStorage($sessionStorage) {
        var data = {};
        return {
            data: data,
            setData: setData,
            getData: getData,
            deleteData: deleteData
        };

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
