(function() {
'use strict';

angular.module('fluReporter.listing').controller('transition', transition);
transition.$inject = ['$timeout','$location'];
function transition($timeout, $location){
    /*jshint validthis: true */
    var vm = this;
    vm.showLoadingAnimation = true;

    $timeout(function() {
        vm.showLoadingAnimation = false;
        $location.path("/listing");
    }, 1000);
}
})();
