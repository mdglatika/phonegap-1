angular.module('FichadaModule')




.controller('TabsCtrl', function($scope, LoginService, $state, $ionicHistory) {

  $scope.back = function() {
    $ionicHistory.goBack();
  };

  $scope.logout = function(){
    //alert("KKK");
    LoginService.LimpiarDatos();
    $state.go("login");
  } 

})

