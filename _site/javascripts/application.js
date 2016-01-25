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

(function() {
'use strict';

angular.module('fluReporter.core', []);
})();
(function() {
'use strict';

angular.module('fluReporter.core').service('googleDataServices', googleDataServices);
googleDataServices.$inject = ['$q'];
function googleDataServices($q){
	/*jshint validthis: true */
	var vm = this;
	vm.findRegionSearchVolume = findRegionSearchVolume;

	function findRegionSearchVolume(countryCode, regionFilter){
		var deferred = $q.defer();
		
		var url = "http://www.google.com/trends/fetchComponent?&q=flu&geo=" + countryCode + "&date=now+7-d&cmpt=q&tz=Etc/GMT-10&tz=Etc/GMT-10&tz=Etc/GMT-10&content=1&cid=GEO_MAP_0_0&export=3";
		var query = new google.visualization.Query(url);
		query.send(handleQueryResponse);

		function handleQueryResponse(response) {
			var searchVolume;
			// if grab google data fail
			if (response.isError()) {
				deferred.reject("fail to connect google service");
			}

			var data = response.getDataTable();
			angular.forEach( data.Gf, function(currentItem, key) {
				angular.forEach( currentItem, function(item, key) {
					// console.log(item[0].v);
					if(item[0].v===regionFilter){
						// console.log(item[1].v);
						searchVolume = item[1].v;
					}
				});
			});
			deferred.resolve(searchVolume);
		}
		
		return deferred.promise;
	}
}

})();
(function() {
'use strict';

angular.module('fluReporter.core').service('locationDataServices', locationDataServices);
locationDataServices.$inject = ['$q', '$window', '$rootScope','$http'];
function locationDataServices($q, $window, $rootScope,$http){
	/*jshint validthis: true */
	var vm = this;
	vm.getUserGeoLocation = getUserGeoLocation;
	vm.geoLocationReverse = geoLocationReverse;

	function getUserGeoLocation(){
                var deferred = $q.defer();
                var posOptions = {
                    enableHighAccuracy: true,
                    timeout: 50000,
                    maximumAge: 0
                };	

                if (!$window.navigator) {
                    $rootScope.$apply(function() {
                        deferred.reject(new Error("Geolocation is not supported"));
                    });
                } else {
                    $window.navigator.geolocation.getCurrentPosition(
                        function (position) {
                            $rootScope.$apply(function() {
                                deferred.resolve(position);
                            });
                        },
                        function (error) {
                            $rootScope.$apply(function() {
                                deferred.reject(error);
                            });
                        },
                        posOptions
                    );
                }
                return deferred.promise;
	}


	function  geoLocationReverse(latitude, longitude) {
		var url = "http://api.geonames.org/countrySubdivisionJSON?lat=" + latitude + "&lng=" + longitude + "&username=harry74323";
		
		return $http.get(url).then(
			reverseComplete, 
			reverseFail
		);
		function reverseComplete(data, status, headers, config) {
			/*
			user.country = data.data.countryName;
			user.countryCode = data.data.countryCode;
			user.region = data.data.adminName1;
			user.regionCode = data.data.codes[1].code;
			user.regionFilter = data.data.countryCode + "-" + data.data.codes[1].code;
			*/
			return data;
            }

		function reverseFail(){
            	console.log("connect geoname server fail");
            	return;
            }
	}
}

})();
(function() {
'use strict';

angular.module('fluReporter.core').service('regionsDataServices', regionsDataServices);
regionsDataServices.$inject = ['$q', '$http'];
function regionsDataServices($q,$http){
    /*jshint validthis: true */
    var vm = this;
    vm.regionData = {};

    vm.loadRegionsData = loadRegionsData;
    vm.getContinent =  getContinent;
    vm.getCountries = getCountries;

    function loadRegionsData(){
        var url = "/data/regions.json";
        var deferred = $q.defer();
        
        $http.get(url).then(
            success, 
            fail
        );

        function success(data) {
            // console.log(data);
            vm.regionData = data.data;
            deferred.resolve();
        }

        function fail(){
            console.log("load regions json fail");
            deferred.reject();
        }

        return deferred.promise;
    }

    function getContinent(){
        var myContinent = [];
        angular.forEach(vm.regionData, function(continent, key) {
            myContinent.push({ name: continent.name, code: continent.code });
        });
        return myContinent;
    }

    function getCountries(continentCode){
        // console.log(continentCode);
        var deferred = $q.defer(); 
        angular.forEach(vm.regionData, function(continent, key) {
            if(continentCode === continent.code){
                deferred.resolve(continent);
            }
        });
        return deferred.promise;
    }
}

})();
(function() {
'use strict';

angular.module('fluReporter.detail', []);

})();
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
(function() {
'use strict';

angular.module('fluReporter.detail').service('searchVolumeHandler', searchVolumeHandler);

// Service.$inject = ['dependencies'];

/* @ngInject */
function searchVolumeHandler() {
    /*jshint validthis: true */
    this.convertProgressbarVolume = convertProgressbarVolume;
    this.verifySearchVolume = verifySearchVolume;
    this.setNumberColor = setNumberColor;
    this.formatNumber = formatNumber;

    ////////////////

    function convertProgressbarVolume(volume) {
        var convertedVolume;
        if(volume>95){
            convertedVolume = 95;

        }else if(volume<7){
            convertedVolume = 7;
        }else{
            convertedVolume = volume;
        }
        return convertedVolume;
    }

    function verifySearchVolume(volume){
        if(volume<100){
            return true;
        }else{
            return false;
        }
    }

    function setNumberColor(volume){
        if(volume<20){
            return "flu-dark-green";
        }else if(volume>20 && volume<40){
            return "flu-light-green";
        }else if(volume>40 && volume<60){
            return "flu-yellow";
        }else if(volume>60 && volume<80){
            return "flu-orange";
        }else{
            return "flu-red";
        }
    }

    function formatNumber(volume){
        var firstNumber, secondNumber, returnString;

        firstNumber = parseInt(volume/10);
        secondNumber = volume%10;

        returnString = firstNumber + '<span>' + secondNumber + '</span>';
        // console.log(returnString);
        return returnString;
    }

    function turnSearchVolume(){

    }
}
})();
(function() {
'use strict';

angular.module('fluReporter.detail').controller('detailController', detailController);
detailController.$inject = ['$sce', 'googleDataServices', 'regionsDataServices','$routeParams', '$timeout', 'searchVolumeHandler', '$location'];
function detailController($sce, googleDataServices, regionsDataServices, $routeParams, $timeout, searchVolumeHandler, $location){
    /*jshint validthis: true */
    var vm = this;
    vm.showLoadingAnimation = true;
    vm.showErrorPanel = false;
    vm.infoPanel = false;
    vm.regionListing = false;
    vm.cityListing = false;
    vm.transition = false;
    vm.errorMessage = "";
    vm.loadingMessage = "Loading data from google... ";	

    vm.currentLocation = {
        countryName: '',
        countryCode: '',
        regionName: '',
        regionCode: '',
        regionFilter: '',
        searchVolume: 0,
        topListURL: '',
        less100: true,
        color: '',
        progressbarVolume: 0
    };


///////////
/*
    var vm = this;
    vm.showLoadingAnimation = false;
    vm.showErrorPanel = false;
    vm.infoPanel = true;
    vm.regionListing = false;
    vm.cityListing = true;
    vm.errorMessage = "";
    vm.loadingMessage = "Loading data from google server ... "; 

    vm.currentLocation = {
        countryName: 'Australia',
        countryCode: 'AU',
        regionName: 'New Sourth Nsw',
        regionCode: 'NSW',
        regionFilter: '',
        searchVolume: '89',
        topListURL: '',
        less100: true,
        color: 'flu-red',
        progressbarVolume: 89
    };
    */
////////////////




    activate();

    function activate(){
        vm.currentLocation.countryCode = angular.uppercase($routeParams.countryCode);
        vm.currentLocation.regionCode = angular.uppercase($routeParams.regionCode);
        findCountryAndRegion();
        // console.log(vm.currentLocation);
        googleDataServices.findRegionSearchVolume(vm.currentLocation.countryCode, vm.currentLocation.regionFilter).then(
            findRegionSearchVolumeComplete,
            findRegionSearchVolumeFail
        );
    }


    function findCountryAndRegion(){
        angular.forEach(regionsDataServices.regionData, function(continent, key) {
            angular.forEach(continent.countries, function(country, key) {
                if(vm.currentLocation.countryCode == country.code){
                    vm.currentLocation.countryName = country.name;
                    angular.forEach(country.regions, function(region, key) {
                        if( vm.currentLocation.regionCode == region.code){
                            vm.currentLocation.regionName = region.name;
                            vm.currentLocation.regionFilter = region.regionFilter;
                        }
                    });
                }
            });
        });
    }

    function findRegionSearchVolumeComplete(data){
        if(data){
            // console.log(data);
            foundMatchingDataFromGoogle(data);
        }else{
            noMatchingDataFromGoogle();
        }
    }

    function findRegionSearchVolumeFail(error){
        console.log("get no data error from google");
        showErrorData();
        vm.errorMessage = "Not Data for " + vm.currentLocation.regionName + " (" + vm.currentLocation.countryName + ")" + " available at this moment";
    }

    function foundMatchingDataFromGoogle(data){
        console.log("found matching data from google");
        console.log(data);

        vm.currentLocation.searchVolume = data;
        vm.currentLocation.topListURL = $sce.trustAsResourceUrl("http://www.google.com/trends/fetchComponent?q=flu&geo=" + vm.currentLocation.regionFilter + "&date=now+7-d&cmpt=q&tz=Etc/GMT-10&tz=Etc/GMT-10&content=1&cid=GEO_TABLE_0_0&export=5");
        vm.currentLocation.less100 = searchVolumeHandler.verifySearchVolume(vm.currentLocation.searchVolume);
        vm.currentLocation.color = searchVolumeHandler.setNumberColor(vm.currentLocation.searchVolume);
        showCorrectData();
        $timeout(function() {
            vm.currentLocation.progressbarVolume = searchVolumeHandler.convertProgressbarVolume(vm.currentLocation.searchVolume);
        }, 300);
        // fluIndicator.setElements();
    }

    function noMatchingDataFromGoogle(){
        console.log("no matching data from google");
        showErrorData();
        vm.errorMessage = "Can not find enough search volume for " + vm.currentLocation.regionName + " (" + vm.currentLocation.countryName + ") "  +" to show results. But flu reporter found following data for " + vm.currentLocation.countryName;
        vm.regionListing = true;
        vm.currentLocation.topListURL = $sce.trustAsResourceUrl("http://www.google.com/trends/fetchComponent?q=flu&geo=" + vm.currentLocation.countryCode + "&date=now+7-d&cmpt=q&tz=Etc/GMT-10&tz=Etc/GMT-10&content=1&cid=GEO_TABLE_0_0&export=5");
    }

    function showCorrectData(){
        vm.showLoadingAnimation = false;
        vm.showErrorPanel = false;
        vm.infoPanel = true;
        vm.cityListing = true;
    }

    function showErrorData(){
        vm.showLoadingAnimation = false;
        vm.showErrorPanel = true;
        vm.infoPanel = false;
        vm.showListingBtn = true;
    }
}


})();



(function() {
'use strict';

angular.module('fluReporter.listing', []);


})();
(function() {
'use strict';

angular.module('fluReporter.listing').controller('listingController', listingController);
listingController.$inject = ['regionsDataServices'];

function listingController(regionsDataServices){
    /*jshint validthis: true */
    var vm = this;
    vm.regionData = regionsDataServices.regionData;
    vm.continent = [];
    vm.currentContinent =[];

    vm.setContinentData = setContinentData;
    vm.setCountryData = setCountryData;

    activate();

    function activate(){
        vm.continent = regionsDataServices.getContinent();
    }

    function setContinentData(continentCode){
        regionsDataServices.getCountries(continentCode).then(
            function(data){
                vm.currentContinent = data;
                console.log(vm.currentContinent);
            }
        );
    }

    function setCountryData(countryCode){
        console.log(countryCode);
    }
}

})();

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

(function() {
'use strict';

angular.module('fluReporter.splash', []);
})();
(function() {
'use strict';

angular.module('fluReporter.splash').controller('splashController', splashController);
splashController.$inject = ['$location', 'locationDataServices', '$timeout', 'regionsDataServices'];
function splashController($location, locationDataServices, $timeout, regionsDataServices){
    /*jshint validthis: true */
    var vm = this;
    vm.showLoadingAnimation = true;
    vm.showErrorPanel = false;
    vm.errorMessage = "";
    vm.showListingBtn = false;
    vm.loadingMessage = "Requiring Location ... ";
    activate();
    
    // testing
    

// testing data 
// 39.984021, 116.336802 => beijing
// -37.79886090033423, 144.93288575863357 => Victoria
// 37.27327855773016, -122.02169691223838
// 43.85975, -79.332201
// 37.765310899999996, -12240470459999999
// 30.252907, 120.162277
/*
locationDataServices.geoLocationReverse(37.27327855773016, -122.02169691223838).then(
geoLocationReverseComplete,
failToGetLocation
);
*/
    function activate(){
        regionsDataServices.loadRegionsData().then(    
            loadRegionsDataComplete,
            loadRegionsDataFail
        );
    }

    function loadRegionsDataComplete(){
        console.log("region data ready");
        //$location.path('/listing');
        // console.log(regionsDataServices.getRegionsData());
        // $location.path('listing');
        locationDataServices.getUserGeoLocation().then(
            getUserGeoLocationComplete,
            failToGetLocation
        );
    }

    function loadRegionsDataFail(){
        // error handling here
        vm.showLoadingAnimation = false;
        vm.showErrorPanel = true;
        vm.errorMessage ="Server unexpectedly closed network connection. Please try again later.";
    }


    function getUserGeoLocationComplete(position){
        // console.log(position);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        locationDataServices.geoLocationReverse(latitude, longitude).then(
            geoLocationReverseComplete,
            failToGetLocation
        );
    }

    function geoLocationReverseComplete(data){
        console.log("Reverse user geoLocation Complete");
        // console.log(data.data.countryCode);
        // console.log(data.data.codes[1].code);
        // console.log(data);
        if(data){
            vm.showSplash = false;
            var detailURL = data.data.countryCode + "/" + data.data.codes[1].code;
            $location.path(detailURL.toLowerCase());
        }else{
            failToGetLocation();
        }
    }

    function failToGetLocation(){
        console.log("get Location fail");
        vm.showLoadingAnimation = false;
        vm.showErrorPanel = true;
        vm.showListingBtn = true;
        vm.errorMessage ="Location service fail, please select your region from listing page";
    }
}

})();



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
//# sourceMappingURL=application.js.map