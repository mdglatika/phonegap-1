angular.module('FichadaModule')



.controller('LugarEditCtrl', function($scope, $stateParams) {
  $scope.latitud = $stateParams.lat;
  $scope.longitud = $stateParams.lng;
  $scope.direccion = $stateParams.descripcion;

})

