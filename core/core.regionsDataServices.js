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