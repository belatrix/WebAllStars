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
        getEmployeeById:{
          url:'api/employee/:employee_id/',
          params:{
            employee_id: '@employee_id'
          },
          actions:{
            'get': {method:'GET'}
          }
        },
        employeeList:{
          url:'api/employee/list/',
          params:{
          },
          actions:{
            'get': {method:'GET'}
          }
        },
        updateBlockEmployee: {
          url:'api/employee/:employee_id/block/:action/',
          params:{
            employee_id: '@employee_id',
            action: '@action'         
          },
          actions: {
            'post': {method:'POST', headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
            }
          }
        },
        getSkillsByEmployeeId:{
          url:'api/employee/:employee_id/skills/list/',
          params:{
            employee_id: '@employee_id'
          },
          actions:{
            'get': {method:'GET'}
          }
        },
        getStartsByEmployeeId:{
          url:'api/star/:employee_id/list/',
          params:{
            employee_id: '@employee_id'
          },
          actions:{
            'get': {method:'GET'}
          }
        }

    });

})();
