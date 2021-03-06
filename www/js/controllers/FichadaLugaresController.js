angular.module('FichadaModule')

.controller('LugaresCtrl', function($scope, $filter, $ionicPopup, $state, $stateParams, LugarService, FicharService, $ionicLoading, LoginService) {
  $scope.listCanSwipe = true
  $scope.cargando = true;

  //viamonte -34.599953, -58.377418
  //amasol: -34.6011346,-58.376141
  //Iteva> -34.5112987,-58.5222914
  //SRP: -34.522950, -58.523104
  $scope.lugares = [];
  $scope.lugares_sin_posicion = [];
  
  /*$scope.lugares =   [
  {id:1, nombre:"Viamonte", direccion:'Viamonte 749 Piso 19 Of4', lat:-34.599953, lng: -58.377418}, 
  {id:2, nombre:"Amasol", direccion:'Tucuman 540', lat: -34.6011346, lng:-58.376141}, 
  {id:3, nombre:"ITEVA Debenedetti", direccion:'Debenedetti 3895', lat: -34.5112987, lng: -58.5222914}, 
  {id:4, nombre:"Santa Rosa Plasticos", direccion:'Maq. Carregal 3151 - Munro', lat: -34.522950, lng: -58.523104}
  ];*/
  $scope.latitud = $stateParams.lat;
  $scope.longitud = $stateParams.lng;

  $scope.mostrar_mi_posicion = function(){
    $state.go('tab.fichada-lugares-mapa', { 'lat': $scope.latitud, 'lng': $scope.longitud, 'descripcion': "Aca estoy!!!" });
  }

  $scope.edit_mapa = function(lugar){
    $state.go('lugar-edit', { 'lat': lugar.Latitud, 'lng': lugar.Longitud, 'descripcion':lugar.Descripcion });
  }
  $scope.mostrar_mapa = function(lugar){
    $state.go('tab.fichada-lugares-mapa', { 'lat': lugar.Latitud, 'lng': lugar.Longitud, 'descripcion': lugar.Descripcion });
  };

  $scope.init_view = function(){
    //alert("init fichadalugares");
    //alert(LugarService.getLugares());
    //$scope.lugares = LugarService.getLugares();
    //alert("Userlogin :"+LoginService.UserLogin.UserName);
    //alert("UserloginID :"+LoginService.UserLogin.Codigo);
    //LugarService.getLugares().then(function(){
    LugarService.getLugaresCercanos($scope.latitud, $scope.longitud).then(function(){
          $scope.lugares = LugarService.lugares;
          $scope.cargando = false;        }, 
        function(error){
          $scope.lugares = [];
          $scope.cargando = false;
        }
      );
  }

  $scope.fichar = function(id){
    if(!LoginService.UserLogin ){

      $ionicPopup.alert({
        title: "Fichar", 
        template: "No se puede obtener el usuario actual"
      });
      return;
    }
    
    //alert("id:"+id);
    // Setup the loader
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    var fichar = {Usuario: LoginService.UserLogin.Codigo, Lugar: id, Latitud: $scope.latitud, Longitud: $scope.longitud};

    FicharService.Fichar(fichar).then(function(){
      $ionicPopup.alert({
        title: "Check", 
        template: "Check In/Out en " + $filter("filter")($scope.lugares, {Id:id})[0].Nombre
      });
      $ionicLoading.hide();
      //console.log($filter("filter")($scope.lugares, {id:id}));
      $state.go('tab.fichada');
    }, 
    function(error){
      alert("error: " + error);
      $ionicLoading.hide();
    });

  };

})