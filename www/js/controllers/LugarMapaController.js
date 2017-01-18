angular.module('FichadaModule')


.controller('LugarMapaCtrl', function($scope, $stateParams) {
  /*
  $scope.cargar = function(){
    $scope.latitud = $stateParams.lat;
    $scope.longitud = $stateParams.lng;
    $scope.descripcion = $stateParams.descripcion;
  }

  */
  $scope.cargar = function(){
    $scope.latitud = $stateParams.lat;
    $scope.longitud = $stateParams.lng;
    $scope.descripcion = $stateParams.descripcion;

    var latLng = new google.maps.LatLng($scope.latitud, $scope.longitud);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    //$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded
    google.maps.event.addListenerOnce(map, 'idle', function(){

      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });      

      var infoWindow = new google.maps.InfoWindow({
        content: $scope.descripcion
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });
    });

  }
  

})