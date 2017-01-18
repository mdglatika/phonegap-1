angular.module('ConfigService', ['LoginModule', 'ConfigModule', 'ConfigModel'])

.factory('ConfigService', function($http, Config, LoginService){
	//var url = "http://200.69.217.157:20123/api/Fichada"
	var configService = {};
	configService.config =  Config.getDefault();



	configService.getConfig = function(){
		return configService.config;
	}

	configService.Guardar = function(){
	  if(!configService.config.Autologin)
	  	LoginService.LimpiarDatos();

	  alert("guardado ok Autologin" + JSON.stringify(configService.config));
	}


	return configService;

})