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