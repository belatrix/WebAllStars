(function() {

    var app = angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngMaterial',
        'ngStorage',
        'ngAnimate',
        'ngMessages',
        'ui.router',
        'config.routes',
        'config.theme',       
        'module.controller',
        'module.service',
        'module.constant',
        'module.component'
        ,'pascalprecht.translate'
    ]).config(function ($translateProvider) {
      $translateProvider.translations('en', {
        // -- Menu
        menu_option : 'Options',
        menu_option1 : 'Coworkers',
        menu_option2 : 'Skills',
        menu_option3 : 'Categories',
        // -- Coworkers
        lblcoworkers: 'Coworkers',
        lblUbication:'Ubication',
        lblRecomendation:'Recomendation',
        lblLocked:'Locked',
        lblUnLocked:'Unlocked',
        lblFindCoworkers:'Find Coworker',
        //-- Categories
        lblRol : 'Rol',
        lblFindCategory : 'Find Categories',
        lblNewCategory : 'New Categories',
        lblNewRol : 'New Rol',
        lbl_tooltip_add_rol : 'Add Rol',
        lbl_tooltip_add_category : 'Add Category',
        // -- Common
        lbl_btnagregar : 'Add',
        lbl_btnsave : 'Save',
        lbl_btncancelar : 'Close',
        lbl_tooltip_accept : 'Accept',
        lbl_tooltip_clear : 'Clear',
        lbl_tooltip_edit : 'Edit',
        lbl_tooltip_delete : 'Delete',
        lbl_active:'Active',
        lbl_inactive:'Inactive',
        lbl_language : 'Language :',
        //-- Pages
        lbl_tooltip_first : 'First',
        lbl_tooltip_previous : 'Previous',
        lbl_tooltip_next : 'Next',
        lbl_tooltip_last : 'Last',
        // -- Skills
        lbl_FindSkills : 'Find Skills',
        // -- New Skills
        lbl_new_skill : 'Skill names',
        lbl_status : 'Status'
      });
      $translateProvider.translations('es', {
        // -- Menu
        menu_option : 'Opciones',
        menu_option1 : 'Trabajadores',
        menu_option2 : 'Habilidades',
        menu_option3 : 'Categorias',
        // -- Trabajadores
        lblcoworkers: 'Trabajadores',
        lblUbication:'Ubicación',
        lblRecomendation:'Recomendación',
        lblLocked:'Bloqueado',
        lblUnLocked:'Desbloqueado',
        lblFindCoworkers:'Buscar Trabajador',
        // -- Categoria
        lblRol : 'Rol',
        lblFindCategory : 'Buscar Categorias',
        lblNewCategory : 'Nueva Categoria',
        lblNewRol : 'Nueva Rol',
        lbl_tooltip_add_rol : 'Agregar Rol',
        lbl_tooltip_add_category : 'Agregar Categoria',
        // -- Common
        lbl_btnagregar : 'Agregar',
        lbl_btnsave : 'Guardar',
        lbl_btncancelar : 'Cancelar',
        lbl_tooltip_accept : 'Aceptar',
        lbl_tooltip_clear : 'Limpiar',
        lbl_tooltip_edit : 'Editar',
        lbl_tooltip_delete : 'Borrar',
        lbl_active:'Activo',
        lbl_inactive:'Inactivo',
        lbl_language : 'Idioma :',
        //-- Pages
        lbl_tooltip_first : 'Inicio',
        lbl_tooltip_previous : 'Previo',
        lbl_tooltip_next : 'Siguiente',
        lbl_tooltip_last : 'Ultimo ',
        // -- Skills
        lbl_FindSkills : 'Buscar Habilidades',
        // -- New Skills
        lbl_new_skill : 'Nombre de Habilidad',
        lbl_status : 'Estado'
        
      });
      $translateProvider.preferredLanguage('en');
    });

    app.config(function ($httpProvider, $resourceProvider) {
      $resourceProvider.defaults.stripTrailingSlashes = false;

      $httpProvider.interceptors.push(['$q', '$location','serviceStorage', '$rootScope', function($q, $location, serviceStorage, $rootScope) {

          return {
                  'request': function (config) {
                      config.headers = config.headers || {};
                      if (serviceStorage.getData('token')) {
                          config.headers.Authorization = 'Token ' + serviceStorage.getData('token');
                      }
                      $rootScope.$broadcast('$request');
                      $rootScope.$broadcast('loadingBefore');
                      return config;
                  },
                  'response': function(response) {
                    $rootScope.$broadcast('$responseSuccess');
                    $rootScope.$broadcast('loadingAfter');
                    return response;
                  },
                  'responseError': function(response) {
                      $rootScope.$broadcast('$responseError');
                      $rootScope.$broadcast('loadingAfter');
                      if(response.status === 401 ||
                         response.status === 403 ||
                         response.status===0) {
                          console.log("Me redirecciona por esta validacion");
                          $location.path('/login');

                      }
                      return $q.reject(response);
                  }
          };
      }]);

    });
    app.run( function( $rootScope ,$resourceService, $state, serviceStorage) {
      var checkingSession,
          hasToken;

        checkingSession = function(){

          hasToken = serviceStorage.getData('token');
          if(hasToken == null){
            $state.go('login');
          }
        };

        $rootScope.$on('$locationChangeStart',function(obj,data){
            checkingSession();
        });

    });

})();
