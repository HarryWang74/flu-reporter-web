(function() {
'use strict';

angular.module('fluReporter').directive('loadingAnimation',loadingAnimation);
function loadingAnimation($window) {
    var directive = {
        restrict: 'E',
        templateUrl: '/snippets/fluReporter.directive.loadingAnimation.html',
        link: calTopPadding
    };
    return directive;

    function calTopPadding(scope, element, attrs) {
        var topPadding = $window.innerHeight*0.25;
        element.children('.loadingAnimation').css('padding-top', topPadding);
    }
}
loadingAnimation.$inject = ['$window'];

})();