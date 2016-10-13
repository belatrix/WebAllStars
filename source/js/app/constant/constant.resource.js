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
        skillList:{
          url:'api/admin/keyword/',
          params:{
          },
          actions:{
            'query': {method:'get',isArray:true}
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
        }, getSkillsByEmployeeId:{
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
        },
        updateSkillState: {
          url:'api/admin/keyword/:keyword_id/',
          params:{
            keyword_id: '@keyword_id',
            name: '@name',
            active: '@is_active'
          },
          actions: {
            'put': {method:'PUT', headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
            }
          }
        },
        createSkill: {
          url:'api/admin/keyword/',
          params:{
            keyword_id: '@name',
            active: '@is_active'         
          },
          actions: {
            'post': {method:'POST', headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
            }
          }
        }

    });

})();
