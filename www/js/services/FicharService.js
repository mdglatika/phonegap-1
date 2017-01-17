angular.module('dbFicharService', ['FicharModel'])

.factory('FicharService', function($http, $q){
	var url = "http://200.69.217.157:20123/api/Fichada"

	var ficharService = {}

	ficharService.Fichar = function(fichada){
		var deferred = $q.defer();
		alert("fichada.Usuario:"+fichada.Usuario);
    alert("fichada.Lugar:"+fichada.Lugar);
    
    var Indata = { "Usuario": fichada.Usuario, "Lugar": fichada.Lugar, "Latitud": fichada.Latitud, "Longitud": fichada.Longitud };
    $http.post( url, Indata).
          then(function (data, status, headers, config){
             console.log(data);
             alert("POST Fichada OK " + data.data);

             deferred.resolve(data.data);
          },
          function (data, status, headers, config) { 
            alert("postFichada error") ;
            deferred.reject();
          });
        return deferred.promise;
	}


	return ficharService;

})