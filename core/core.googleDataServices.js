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