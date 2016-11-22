(function () {
  'use strict';

  angular.module('module.constant').constant('resourceServiceConfig', {

      remoteURL: 'http://belatrix-connect.herokuapp.com/',

      auth: {
        url: 'api/employee/authenticate/',
        params: {
        },
        actions: {
          'post': {
            method: 'POST', headers: {
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
      getEmployeeById: {
        url: 'api/employee/:employee_id/',
        params: {
          employee_id: '@employee_id'
        },
        actions: {
          'get': { method: 'GET' }
        }
      },
      employeeList: {
        url: 'api/employee/list/',
        params: {
        },
        actions: {
          'get': { method: 'GET' }
        }
      },
      skillList: {
        url: 'api/admin/keyword/',
        params: {
        },
        actions: {
          'query': { method: 'get' }
        }
      },
      updateBlockEmployee: {
        url: 'api/employee/:employee_id/block/:action/',
        params: {
          employee_id: '@employee_id',
          action: '@action'
        },
        actions: {
          'post': {
            method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      getSkillsByEmployeeId: {
        url: 'api/employee/:employee_id/skills/list/',
        params: {
          employee_id: '@employee_id'
        },
        actions: {
          'get': { method: 'GET' }
        }
      },
      getStartsByEmployeeId: {
        url: 'api/star/:employee_id/list/',
        params: {
          employee_id: '@employee_id'
        },
        actions: {
          'get': { method: 'GET' }
        }
      },
      updateSkillState: {
        url: 'api/admin/keyword/:keyword_id/',
        params: {
          keyword_id: '@keyword_id',
          name: '@name',
          active: '@is_active'
        },
        actions: {
          'put': {
            method: 'PUT', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      createSkill: {
        url: 'api/admin/keyword/',
        params: {
          keyword_id: '@name',

          active: '@is_active'
        },
        actions: {
          'post': {
            method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      categoryList: {
        url: 'api/admin/category/',
        params: {
        },
        actions: {
          'get': { method: 'GET' }
        }
      },
      updateCategory: {
        url: 'api/admin/category/:category_id/',
        params: {
          category_id: '@category_id'
        },
        actions: {
          'put': {
            method: 'PUT', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      registerCategory: {
        url: 'api/admin/category/',
        params: {
        },
        actions: {
          'post': {
            method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      deleteCategory: {
        url: 'api/admin/category/:category_id/',
        params: {
          category_id: '@category_id'
        },
        actions: {
          'delete': {
            method: 'DELETE', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      subCategoryList: {
        url: 'api/admin/subcategory/',
        params: {
        },
        actions: {
          'get': { method: 'GET' }
        }
      },
      registerSubCategory: {
        url: 'api/admin/subcategory/',
        params: {
        },
        actions: {
          'post': {
            method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      updateSubCategory: {
        url: 'api/admin/subcategory/:subcategory_id/',
        params: {
          subcategory_id: '@subcategory_id'
        },
        actions: {
          'put': {
            method: 'PUT', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      addSubCategory: {
        url: '/api/admin/category/:category_id/',
        params: {
          category_id: '@category_id'
        },
        actions: {
          'patch': {
            method: 'PATCH', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      },
      delete: {
        url: 'api/admin/delete/:kind/:id/',
        params: {
          kind: '@kind',
          id: '@id'
        },
        actions: {
          'delete': {
            method: 'DELETE', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        }
      }
    });
})();
