angular.module('FichadaModule')


.controller('FichadaCtrl', function($scope, $ionicPopup, $timeout, $cordovaGeolocation, $state, $ionicLoading, LoginService){
  var lat = -34.713648;
  var lng = -58.592187;

  $scope.usuario = "" + LoginService.UserLogin.UserName;
  $scope.buscando = false;

  $scope.logout = function(){
    LoginService.LimpiarDatos();
    $state.go("login");
  }

  $scope.buscar_posicion = function(){
    //$ionicLoading.show();
    /////////////////////////////////////////////////
    $scope.buscando = true;
    $scope.location = {lat: 0, lng: 0 };

    $timeout(function() {      
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var lng = position.coords.longitude;

        $scope.location = {lat: position.coords.latitude, lng: position.coords.longitude };
        $scope.buscando = false;

      //alert("lat:"+lat + " lng:"+long);
      //marconi y ruta 3
      //alert("dist: "+distance(long, lat, $scope.data.lng, $scope.data.lat));
      //si esta ok voy a la nueva vista
      $state.go('tab.fichada-lugares', { 'lat': lat, 'lng': lng });
    }, function(err) {
      //alert("err:"+err);
      console.log(err);
      $scope.buscando = false;
      //aunque de error voy igual para desa
      alert("DEBUG error al traar lat/lng: por default se usa " + lat + '-' + lng + ' y paso a la siguiente vista');
      $state.go('tab.fichada-lugares', { 'lat': lat, 'lng': lng });
    });
    //alert("encontrado");
    }, 1000);
}
})