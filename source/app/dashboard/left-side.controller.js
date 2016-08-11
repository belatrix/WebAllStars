(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('LeftSideController', LeftSideController);

    LeftSideController.$inject = [
       '$mdSidenav',
       '$mdUtil',
       '$log'
    ];

    function LeftSideController($mdSidenav,
                                $mdUtil,
                                $log) {

        var vm = this;

        vm.close = close;

        function close() {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        }
    	
    }

})();
