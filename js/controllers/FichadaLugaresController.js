angular.module('FichadaModule')

.controller('LugaresCtrl', function($scope, $filter, $ionicPopup, $state, $stateParams, LugarService, FicharService) {
  $scope.listCanSwipe = true
  //viamonte -34.599953, -58.377418
  //amasol: -34.6011346,-58.376141
  //Iteva> -34.5112987,-58.5222914
  //SRP: -34.522950, -58.523104
  $scope.lugares = [];
  /*$scope.lugares =   [
  {id:1, nombre:"Viamonte", direccion:'Viamonte 749 Piso 19 Of4', lat:-34.599953, lng: -58.377418}, 
  {id:2, nombre:"Amasol", direccion:'Tucuman 540', lat: -34.6011346, lng:-58.376141}, 
  {id:3, nombre:"ITEVA Debenedetti", direccion:'Debenedetti 3895', lat: -34.5112987, lng: -58.5222914}, 
  {id:4, nombre:"Santa Rosa Plasticos", direccion:'Maq. Carregal 3151 - Munro', lat: -34.522950, lng: -58.523104}
  ];*/
  $scope.latitud = $stateParams.lat;
  $scope.longitud = $stateParams.lng;

  $scope.edit_mapa = function(lugar){
    $state.go('lugar-edit', { 'lat': lugar.lat, 'lng': lugar.lng, 'descripcion':lugar.descripcion });
  }
  $scope.mostrar_mapa = function(lugar){    
    $state.go('tab.fichada-lugares-mapa', { 'lat': lugar.lat, 'lng': lugar.lng, 'descripcion': lugar.descripcion });
  };

  $scope.cargar_lugares = function(){
    //alert("init fichadalugares");
    //alert(LugarService.getLugares());
    //$scope.lugares = LugarService.getLugares();

    LugarService.getLugares().then(function(){

          $scope.lugares = LugarService.lugares;
        }, 
        function(error){
          $scope.lugares = [];
        }
      );
  }

  $scope.fichar = function(id){
    var fichar = {Usuario: 2, Lugar: id, Latitud: $scope.latitud, Longitud: $scope.longitud};

    FicharService.Fichar(fichar).then(function(){
      $ionicPopup.alert({
        title: "Fichar", 
        template: "Guardado el fichado para " + $filter("filter")($scope.lugares, {Id:id})[0].Nombre
      });
      //console.log($filter("filter")($scope.lugares, {id:id}));
      $state.go('tab.fichada');
    }, 
    function(error){
      alert("error: " + error);
    });

  };

})