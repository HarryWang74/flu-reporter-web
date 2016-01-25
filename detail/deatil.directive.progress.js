(function() {
    'use strict';

    angular.module('fluReporter.detail').directive('fluProgress', fluProgress);

    // directive.$inject = ['dependencies'];

    /* @ngInject */
    function fluProgress ($window) {
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'detail/deatil.directive.progress.html'
        };
        return directive;
        function link(scope, element, attrs) {
            var setWidthTarget = angular.element(document.querySelector(".progress-bar"));
            var heightTarget = angular.element(document.getElementById('fluProgress'));

            setElements();
            angular.element($window).bind('resize', function() {
                setElements();
            });

            // console.log(scope.vm.currentLocation);
            
            function setElements(){
                // console.log($window.innerWidth);
                // console.log(scope.vm.currentLocation.progressbarVolume);
                setWidthTarget.css("width", scope.vm.currentLocation.progressbarVolume+"%");
                
                if($window.innerWidth < 991){
                    heightTarget.css("height", $window.innerWidth*0.15 + 'px');
                }else{
                    heightTarget.css("height", '153px');
                }
            }
        }
    }
    fluProgress.$inject = ['$window'];
})();