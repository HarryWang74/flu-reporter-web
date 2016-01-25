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
