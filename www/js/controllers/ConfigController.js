angular.module('ConfigModule')




.controller('ConfigCtrl', function($scope, ConfigService, Config) {
	$scope.config = ConfigService.getConfig();


	$scope.autologin_change = function(){
		//alert($scope.config.autologin);
		ConfigService.config.Autologin = $scope.config.Autologin;
		ConfigService.Guardar();
	}
  
 

})

