(function() {
  'use strict';

  	angular
        .module('app.common')
        .constant('resourceServiceConfig', {
            remoteURL: 'https://belatrix-connect.herokuapp.com/',
            endpoints: {
                auth: 'api/employee/authenticate/',
                authOptions: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });

})();
