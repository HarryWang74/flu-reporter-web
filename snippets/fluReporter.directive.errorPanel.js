(function() {
    'use strict';

    angular.module('fluReporter').directive('errorPanel', errorPanel);

    // directive.$inject = ['dependencies'];

    /* @ngInject */
    function errorPanel () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'snippets/fluReporter.directive.errorPanel.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();