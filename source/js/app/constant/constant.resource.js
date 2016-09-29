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
                       for (var d in data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                       return str.join("&");
              }
            }
          }
        },
        employeeList : {
          url:'api/employee/list/',
          params:{
          },
          actions:{
            'get': {method:'GET'}
          }
        },

        updateBlockEmployee : {
          url:'api/employee/{employee_id}/block/{action}/',
          params:{
          },
          actions:{
            'post': {method:'POST', headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              transformRequest: function (data, headersGetter) {
                       var str = [];
                       console.log("Request : "+data.employee_id);
                       for (var d in data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                       return str.join("&");
              }
            }
          }
        }
    });

})();