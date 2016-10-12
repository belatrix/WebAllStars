//based on https://github.com/techfano/general-components
(function() {
	'use strict';
	/*jshint latedef: false */
	/*jshint validthis: true */
	/*jshint maxlen:800 */
	angular
		.module('module.component.animations',[])
		.directive('errorShake', errorShake)
		.directive('animatedLoad', animatedLoad)
		.directive('clickMove', clickMove);

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

		function animatedLoad($rootScope){

			var directive = {
				restrict: 'A',
				scope:{
					animatedType:'@'
				},
				link:link
			};

			return directive;

			function link($scope,element,$attr){

				var q = angular.element(element);

				if($attr.animatedLoad){

					q.removeClass('animated');
					q.removeClass($attr.animatedLoad);

					q.addClass('animated');
					q.addClass($attr.animatedLoad);

          /*.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			    		//q.removeClass('animated '+$attr.animatedLoad);
   					});*/

					$rootScope.$on('$translateChangeSuccess',function(){

						q.removeClass('animated '+$attr.animatedLoad);

						q.addClass('animated '+$attr.animatedLoad).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			    			q.removeClass('animated '+$attr.animatedLoad);
		 				});

					});



				}

			}

		}

		function clickMove() {

			var directive = {
				restrict: 'A',
				link:link
			};

			return directive;

			function link($scope,element){
				var q = angular.element(element);

				q.on('click',function(){
					q.addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			    		q.removeClass('animated pulse');
		 			});
				});


			}


		}

}());
