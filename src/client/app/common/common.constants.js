(function() {
  'use strict';

  	angular
        .module('app.common')
        .constant('resourceServiceConfig', {
            remoteURL: 'http://belatrix-connect.herokuapp.com/',
            auth: {
                url: 'api/employee/authenticate/',
                params: {},
                actions: {
                    'post': {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            for (var d in data) {
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join("&");
                        }
                    }
                }
            }
        });

})();
