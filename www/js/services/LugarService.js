angular.module('dbLugarService', ['LugarModel'])

.factory('LugarService', function($http, $q, Lugar){
	var url_lugares = "http://200.69.217.157:20123/api/Lugar"

	var lugarService = {}

	lugarService.lugares = [];

	lugarService.seleccionado = null;

	var selectLugarById = function(id){
		for (var i = 0; i < lugarService.lugares.length; i++) {
			if(lugarService.lugares[i].id == id){
				return lugarService.lugares[id];
			}
		}
		return null;
	}

	lugarService.getLugar = function(id){		
		lugarService.selecionado = selectLugarById(id);		
		return lugarService.selecionado;
	}

	lugarService.getLugares = function(){		
		var deferred = $q.defer();
		$http.get( url_lugares).
                  success(function (data) {
                      console.log(data);
                      //alert("getLugar  OK " + data);
                      //alert("getLugar  OK " + data[0].Direccion);
                      lugarService.lugares = Lugar.buildAll(data);
                      console.log(lugarService.lugares);
                      deferred.resolve(lugarService.lugares);

                  }).
                  error(function (data, status, headers, config) {
                      // log error
                      alert("get LugarERRRRR" + data);
                      lugarService.lugares = [];
                      deferred.resolve([]);
                  });
        return deferred.promise;
	}


	lugarService.getLugaresCercanos = function(lat,lng){
    //var slat, slng;
		var deferred = $q.defer();
    alert(url_lugares + '?latitud='+lat+'&longitud='+lng);
		$http.get( url_lugares + '?latitud='+lat+'&longitud='+lng).
                  success(function (data) {
                      console.log(data);
                      //alert("getLugar  OK " + data);
                      //alert("getLugar  OK " + data[0].Direccion);
                      lugarService.lugares = Lugar.buildAll(data);
                      console.log(lugarService.lugares);
                      deferred.resolve(lugarService.lugares);

                  }).
                  error(function (data, status, headers, config) {
                      // log error
                      alert("get LugarERRRRR" + data);
                      lugarService.lugares = [];
                      deferred.resolve([]);
                  });
        return deferred.promise;
	}


	return lugarService;

})