(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */

    angular.module('module.component.table',[])
            .directive('uiTable', uiTable);

    function uiTable($rootScope){

        var directive = {
            restrict: 'AE',
            scope:{
                tableModel: '=',
                tableRequest: '='
            },
            templateUrl: 'views/directive/uiTable.html',
            link: link,
            controller: controller
        };

        return directive;

        function link() {
           
        }

        function controller($scope){

            var getTable = function(parameters){
                
                if($scope.tableRequest){
                    $scope.tableRequest.request.get(parameters,function(data){

                        $scope.tableModel = data;

                        if($scope.tableRequest.headerDefine){
                            $scope.tableModel = queryTable(data,$scope.tableRequest.headerDefine);
                        }
                        
                        angular.extend(parameters,data.pagination);
                        $rootScope.$emit('$tableLoadSuccess',parameters);
                        console.log('table loaded');
                    });

                }

            
            };



            if($scope.tableRequest){
                getTable($scope.tableRequest.parameters);
                $rootScope.$$listeners.$paginationEvent=[];
            }


            $rootScope.$on('$paginationEvent',function(event,parameters){
                $scope.parameters = parameters;
                getTable(angular.merge($scope.tableRequest.parameters,parameters));
            });

            var queryTable = function(tableModel,headerDefine){

                var ids=[];

                var lista = [];
                                
                angular.forEach(headerDefine, function(value,key){
                        ids[key]=value.obj;
                });

                angular.forEach(tableModel,function(value){
                
                    var v='{';
                  
                    for (var i=0; i < ids.length; i++) {
                        if(i===ids.length-1){
                            v+='"'+ids[i]+'":"'+value[ids[i]]+'"';
                        }else{
                            v+='"'+ids[i]+'":"'+value[ids[i]]+'",';
                        }
                    }
                  
                    v+='}';
                  
                    lista.push(JSON.parse(v));
                
                });
                //console.log(lista);
                return lista;

                
            };

        }

    }

}(angular));