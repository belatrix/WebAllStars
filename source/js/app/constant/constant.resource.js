(function() {
  'use strict';

  	angular.module('module.constant.resource', [])

	.constant('resourceServiceConfig',{

        remoteURL: 'http://belatrix-connect.herokuapp.com/',

        auth:{
          url:'api/employee/authenticate/',
          params:{
          },
          actions:{
            'post': {method:'POST', headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
              },
              transformRequest: function (data, headersGetter) {
                       var str = [];
                       console.log("Data : "+data.username+"**"+data.password);
                       for (var d in data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                       return str.join("&");
              }
            }
          }
        },
        list_coworkers : {
          url:'api/employee/list/',
          actions:{
            'get':{method:'GET'}
          }
        }

    });

})();