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
              },
              'footer@': {
                templateUrl: 'layout/footer.view.html',
                controller: 'controller.footer',
              }
            }
        }).state('login', {
            parent:'init',
            url: "/login",
            templateUrl: "views/login.view.html",
            controller: "controller.login"
        }).state('coworkers', {
            parent:'dashboard',
            url: "/coworkers",
            templateUrl: "views/coworkers.view.html",
            controller: "controller.coworkers"
        }).state('skills', {
            parent:'dashboard',
            url: "/skills",
            templateUrl: "views/skills.view.html",
            controller: "controller.skills",
        }).state('category', {
            parent:'dashboard',
            url: "/category",
            templateUrl: "views/category.view.html",
            controller: "controller.category"
        }).state('activity', {
            parent:'dashboard',
            url: "/activity",
            templateUrl: "views/activity.view.html",
            controller: "controller.activity"
        }).state('coworker-detail', {
            parent:'dashboard',
            url: "/coworker-detail",
            templateUrl: "views/coworker-detail.view.html",
            controller: "controller.coworker-detail",
            params: {
              employee_id: null
            }
        }).state('events', {
            parent:'dashboard',
            url: "/events",
            templateUrl: "views/events.view.html"
        });

      $urlRouterProvider.otherwise("/login");

	});


})();
