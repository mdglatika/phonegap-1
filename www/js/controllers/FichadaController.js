angular.module('FichadaModule')


.controller('FichadaCtrl', function($scope, $ionicPopup, $timeout, $cordovaGeolocation, $state, $ionicLoading){

  // Setup the loader
  $ionicLoading.show({
    content: 'Buscando',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.data1={lat: -34.7054123, lng: -58.5999008};
  $scope.data2={lat: -34.7054123, lng: -58.5999008};
  

  $scope.buscando = false;
  $ionicLoading.hide();
  $scope.buscar_posicion = function(){
      //$ionicLoading.show();

  /////////////////////////////////////////////////
  $scope.buscando = true;
  $scope.location = {lat: 0, lng: 0 };

  function distance(lon1, lat1, lon2, lat2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2-lon1).toRad(); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  /** Converts numeric degrees to radians */
  if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }

  $timeout(function() {      
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var lng = position.coords.longitude;

      $scope.location = {lat: position.coords.latitude, lng: position.coords.longitude };
      $scope.buscando = false;
      $ionicLoading.hide();

    //alert("lat:"+lat + " lng:"+long);
    //marconi y ruta 3
    //alert("dist: "+distance(long, lat, $scope.data.lng, $scope.data.lat));
    $state.go('tab.fichada-lugares', { 'lat': lat, 'lng': lng });


  }, function(err) {
    //alert("err:"+err);
    console.log(err);
    $scope.buscando = false;
    $ionicLoading.hide();
    /*for(var key in err) {
      alert('----key: ' + key + '\n' + '----value: ' + err[key]);
    }*/
    var dist;
    dist=distance(
      parseFloat($scope.data1.lng), 
      parseFloat($scope.data1.lat), 
      parseFloat($scope.data2.lng), 
      parseFloat($scope.data2.lat));
    alert("Error "+"\n" + 
      "lng1:"+$scope.data1.lng + ",lat1:"+$scope.data1.lat +"\n"+
      "lng2:"+$scope.data2.lng + ",lat2:"+$scope.data2.lat +"\n"+      
      "dist: " +dist);
    //$state.go('lugares/lat='+$scope.data1.lat + '&lng='+$scope.data1.lng);
    $state.go('tab.fichada-lugares', { 'lat': $scope.data1.lat, 'lng': $scope.data1.lng });



  });


      //alert("encontrado");
    }, 1000);
}
})