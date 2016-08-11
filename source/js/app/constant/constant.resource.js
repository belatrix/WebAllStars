(function() {
  'use strict';

  	angular.module('module.constant.resource', [])

	.constant('resourceServiceConfig',{

        auth:{
          url:'/fumiambar/auth/login/:name/:password',
          params:{
            name:'@name',
            password:'@password'
          },
          actions:{
            'get':   {method:'GET'}
          }
        },

        verify:{
          url:'/fumiambar/auth/verify',
          params:{
            name:'@name',
            password:'@password'
          },
          actions:{
            'get':   {method:'GET'}
          }
        },

        userList:{
          url:'/fumiambar/user/list/:skip/:limit',
          params:{
            name:'@skip',
            password:'@limit'
          },
          actions:{
            'get':   {method:'GET', isArray: true, cache: false}
          }
        },

        userCreate:{
          url:'/fumiambar/user/create',
          params:{
          },
          actions:{
            'save':   {method:'post', isArray: false}
          }
        },

        userUpdate:{
          url:'/fumiambar/user/update/:_id',
          params:{
            _id:'@_id'
          },
          actions:{
            'put':   {method:'PUT', isArray: false}
          }
        }
       
    });

})();