(function () {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('logger', logger);

  /* @ngInject */
  function logger($log) {

    var service = {
      error  : error,
      info   : info,
      success: success,
      warning: warning,

      // straight to console
      log: $log.log
    };

    return service;
    /////////////////////

    function error(message,
                   data) {
      $log.error('Error: ' + message, data);
    }

    function info(message,
                  data) {
      $log.info('Info: ' + message, data);
    }

    function success(message,
                     data) {
      $log.info('Success: ' + message, data);
    }

    function warning(message,
                     data) {
      $log.warn('Warning: ' + message, data);
    }
  }
}());
