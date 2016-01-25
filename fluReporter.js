(function() {
'use strict';

angular.module('fluReporter', [
    'ngRoute',
    'fluReporter.splash',
    'fluReporter.listing',
    'fluReporter.detail',
    'fluReporter.core'
]);

angular.module('fluReporter').config(configSetting);

function configSetting($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'splash/splash.html', 
        controller: 'splashController',
        controllerAs: 'vm'
    }).

    when('/listing', {
        templateUrl: 'listing/lisitng.html', 
        controller: 'listingController',
        controllerAs: 'vm'
    }).
    when('/transition', {
        templateUrl: 'listing/transition.html',
        controller: 'transition',
        controllerAs: 'vm'
    }).
    when('/:countryCode/:regionCode', {
        templateUrl: 'detail/detail.html', 
        controller: 'detailController',
        controllerAs: 'vm'
    }).
    when('/about', {
        templateUrl: 'about/about.html'
    }).
    otherwise({
    	redirectTo: '/listing'
    });
}
configSetting.$inject = ['$routeProvider'];

// when refresh redirect to /
angular.module('fluReporter').run(['$location', function($location) {
    $location.path('/');
}]);

// load google charting then manually bootstrap angular app, 
google.load('visualization', '1');
google.setOnLoadCallback(function() {
    angular.bootstrap(document, ['fluReporter']);
});
})();
