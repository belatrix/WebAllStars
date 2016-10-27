//based on https://github.com/techfano/general-components
(function() {
	'use strict';
	angular
		.module('module.component.animations',[])
		.directive('errorShake', errorShake)
		.directive('animatedSuccess', animatedSuccess)
		.directive('animatedLoad', animatedLoad)
		.directive('animatedClick', animatedClick);

		function errorShake($rootScope) {

			var directive = {
				restrict: 'A',
				link:link
			};

			return directive;

			function link($scope,element){
				var q = angular.element(element);

				$rootScope.$on('$responseError',function(){
					q.addClass('animated shake');
				});

				$rootScope.$on('$request', function(){
					q.removeClass('animated shake');
				});

			}


		}

		function animatedSuccess($rootScope) {

			var directive = {
				restrict: 'A',
				link:link
			};

			return directive;

			function link($scope,element){
				var q = angular.element(element);

				if($attr.animatedSuccess){
					$rootScope.$on('$responseSuccess',function(){
						q.addClass('animated '+ $attr.animatedSuccess).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				    		q.removeClass('animated ' + $attr.animatedSuccess);
			 			});
					});
				}
			}


		}

		function animatedLoad($rootScope){

			var directive = {
				restrict: 'A',
				link:link
			};

			return directive;

			function link($scope,element,$attr){

				var q = angular.element(element);

				if($attr.animatedLoad){
					angular.element(document).ready(function () {
						q.removeClass('hide');
						q.addClass('animated '+ $attr.animatedLoad).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				    		q.removeClass('animated ' + $attr.animatedLoad);
			 			});
        			});
				}

			}

		}

		function animatedClick() {

			var directive = {
				restrict: 'A',
				link:link
			};

			return directive;

			function link($scope,element){
				var q = angular.element(element, $attr);

				q.on('click',function(){

					if($attr.animatedClick){

						q.addClass('animated '+ $attr.animatedClick).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				    		q.removeClass('animated ' + $attr.animatedClick);
			 			});

					}

				});


			}


		}



}());
