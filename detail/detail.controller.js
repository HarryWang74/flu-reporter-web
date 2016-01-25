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
        // console.log("found matching data from google");
        // console.log(data);

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


