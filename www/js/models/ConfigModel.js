angular.module('ConfigModel', [])


.factory('Config', function(){
	function Config(Autologin, Url ){
		this.Autologin = Autologin;
		this.Url = Url;
	}

	Config.getDefault = function() {
		return {Autologin: true, Url: "wwww"};
	};
	

	return Config;
})