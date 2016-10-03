(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */

    angular.module('module.component.progressLinear',[])
            .directive('progressLinear', progressLinear);

    function progressLinear($rootScope){

        var directive = {
            restrict: 'E',
            scope:{
            },
            templateUrl: 'views/directive/progressLinear.html',
            link: link,
            controller: controller
        };

        return directive;

        function link() {

        }

        function controller($scope){
            $rootScope.$on('loadingBefore', function () {
                $scope.loading = true;
            });

            $rootScope.$on('loadingAfter', function () {
                $scope.loading = false;
            });
        }

    }

}(angular));
