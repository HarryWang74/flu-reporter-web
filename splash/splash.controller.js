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


