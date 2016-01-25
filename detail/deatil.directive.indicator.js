(function() {
'use strict';

angular.module('fluReporter.detail').directive('fluIndicator', fluIndicator);

// directive.$inject = ['dependencies'];


function fluIndicator ($window, $timeout) {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        link: link,
        restrict: 'E',
        templateUrl: 'detail/deatil.directive.indicator.html'
    };
    return directive;

    function link(scope, element, attrs) {

        var reporterInRegular =  angular.element(document.querySelector('.regularPanel .reporter'));
        var reporter100 = angular.element(document.querySelector('.hundred-panel .reporter'));

        var searchVolume= angular.element(document.getElementById('searchVolume'));
        var hundred = angular.element(document.getElementById('hundred'));

        setElements();

        angular.element($window).bind('resize', function() {
            setElements();
        });

    /*
        $timeout(function() {
            turnSearchVolume();
        }, 1000);
    */

        function turnSearchVolume(){
            console.log(scope.vm.currentLocation.searchVolume);
            
            var counter = { var: 0 };
            TweenLite.to(counter, 2, {
                var: scope.vm.currentLocation.searchVolume, 
                onUpdate: function () {
                    // vm.regularPanelNumber = counter.var;
                    document.getElementById("searchVolume").innerHTML = Math.ceil(counter.var);
                    // console.log(vm.regularPanelNumber);
                    }
            });
        }

        function setElements(){
            var containerWidth = $window.innerWidth;

            if(containerWidth < 991){
                reporterInRegular.css("width", containerWidth*0.4*0.45 + "px");
                reporter100.css("width", containerWidth*0.4*0.32 + "px");
                
                searchVolume.css("font-size", containerWidth*0.6 + "px");
                hundred.css("font-size", containerWidth*0.5 + "px");
            }else{
                reporter100.css("width", "103px");
                reporterInRegular.css("width", "130px");
                
                searchVolume.css("font-size", "460px");
                hundred.css("font-size", "400px");
            }
        }
    }
}
fluIndicator.$inject = ['$window', '$timeout'];

})();