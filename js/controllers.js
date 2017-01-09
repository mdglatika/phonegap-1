angular.module('starter.controllers', [])

.controller('LugarEditCtrl', function($scope, $stateParams) {
  $scope.latitud = $stateParams.lat;
  $scope.longitud = $stateParams.lng;
  $scope.direccion = $stateParams.descripcion;





})


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


.controller('LugaresCtrl', function($scope, $filter, $ionicPopup, $state, $stateParams) {
  $scope.listCanSwipe = true
  //viamonte -34.599953, -58.377418
  //amasol: -34.6011346,-58.376141
  //Iteva> -34.5112987,-58.5222914
  //SRP: -34.522950, -58.523104
  $scope.lugares =   [
    {id:1, nombre:"Viamonte", direccion:'Viamonte 749 Piso 19 Of4', lat:-34.599953, lng: -58.377418}, 
    {id:2, nombre:"Amasol", direccion:'Tucuman 540', lat: -34.6011346, lng:-58.376141}, 
    {id:3, nombre:"ITEVA Debenedetti", direccion:'Debenedetti 3895', lat: -34.5112987, lng: -58.5222914}, 
    {id:4, nombre:"Santa Rosa Plasticos", direccion:'Maq. Carregal 3151 - Munro', lat: -34.522950, lng: -58.523104}
    ];
  $scope.latitud = $stateParams.lat;
  $scope.longitud = $stateParams.lng;

  $scope.edit_mapa = function(lugar){
    $state.go('lugar-edit', { 'lat': lugar.lat, 'lng': lugar.lng, 'descripcion':lugar.descripcion });
  }
  $scope.mostrar_mapa = function(lugar){    
    $state.go('lugar-mapa', { 'lat': lugar.lat, 'lng': lugar.lng, 'descripcion': lugar.descripcion });
  };

  $scope.fichar = function(id){
    $ionicPopup.alert({
      title: "Fichar", 
      template: "Guardado el fichado para " + $filter("filter")($scope.lugares, {id:id})[0].nombre
      });

    console.log($filter("filter")($scope.lugares, {id:id}));
    $state.go('home');
  };

})

.controller('HomeCtrl', function($scope, $ionicPopup, $timeout, $cordovaGeolocation, $state){

  $scope.data1={lat: -34.7054123, lng: -58.5999008};
  $scope.data2={lat: -34.7054123, lng: -58.5999008};
  

  $scope.buscando = false;
  $scope.buscar_posicion = function(){

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

    //alert("lat:"+lat + " lng:"+long);
    //marconi y ruta 3
    //alert("dist: "+distance(long, lat, $scope.data.lng, $scope.data.lat));
    $state.go('lugares', { 'lat': lat, 'lng': lng });

 
  }, function(err) {
    //alert("err:"+err);
    console.log(err);
    $scope.buscando = false;
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
    $state.go('lugares', { 'lat': $scope.data1.lat, 'lng': $scope.data1.lng });



  });


      //alert("encontrado");
    }, 1000);
}
})

.controller('LoginCtrl', function($scope, loginService, $ionicPopup, $state, $http){
  $scope.data = {};

  var user = angular.fromJson(window.localStorage['user'] || '{}');

  if(loginService.validar(user)){
      //$state.go('home');
    }


    function guardar_en_disco(user){
      //window.localStorage['username'] = user.username;
      //window.localStorage['password'] = user.password;
      window.localStorage['user'] = angular.toJson(user);
    }
    $scope.login = function(){
      var user = {username: $scope.data.username, password: $scope.data.password}

        //alert("login:"+$scope.data.username + " pwd:" + $scope.data.password);        
        if(loginService.validar(user)){

          guardar_en_disco(user);
/*
          $ionicPopup.alert({
            title: "Login ok", 
            template: "bien chamaco"
          });*/
          $state.go('home');

        }
        else
          $ionicPopup.alert({
            title: "Login NOOO ok", 
            template: "user:mds, pass:mds"
          });
        
      }
    })

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
