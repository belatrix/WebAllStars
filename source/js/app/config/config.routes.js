(function() {
  'use strict';
	angular.module('config.routes', ['ngRoute', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('init', {
          abstract: true,
          views: {
            'content@': {
              template: '<ui-view />', // NEW line, with a target for a child
            }
          }
        }).state('dashboard', {
            abstract: true,
            views: {
              '@': {
                template: '<ui-view />', // NEW line, with a target for a child
              },
              'header@': {
                templateUrl: 'layout/header.view.html',
                controller: 'controllerHeader'
              },
              'content@': {
                templateUrl: 'layout/leftSide.view.html',
                controller: 'controller.leftSide',
              }
            }
        }).state('login', {
            parent:'init',
            url: "/login",
            templateUrl: "views/login.view.html",
            controller: "controller.login"
        });

      $urlRouterProvider.otherwise("/login");

	});


})();