(function() {
    'use strict';

    angular.module('fluReporter').directive('googleAd', googleAd);

    // directive.$inject = ['dependencies'];

    /* @ngInject */
    function googleAd () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'snippets/fluReporter.directive.googleAD.html'
        };
        return directive;

        function link(scope, element, attrs) {
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
})();